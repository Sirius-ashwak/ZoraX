import { Router } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { insertUserSchema, insertCampaignSchema, insertMintSchema, ApiResponse, PaginatedResponse } from '../shared/schema';

const router = Router();

// Helper function for API responses
const apiResponse = <T>(data?: T, error?: string, message?: string): ApiResponse<T> => ({
  success: !error,
  data,
  error,
  message,
});

const paginatedResponse = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> => ({
  success: true,
  data: {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
});

// Validation middleware
const validateBody = (schema: z.ZodSchema) => (req: any, res: any, next: any) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(apiResponse(undefined, 'Validation error', error.errors[0]?.message));
    } else {
      res.status(400).json(apiResponse(undefined, 'Invalid request body'));
    }
  }
};

// User routes
router.get('/api/users', async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(apiResponse(users));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch users'));
  }
});

router.get('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await storage.getUserById(id);
    if (!user) {
      return res.status(404).json(apiResponse(undefined, 'User not found'));
    }
    res.json(apiResponse(user));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch user'));
  }
});

router.get('/api/users/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const user = await storage.getUserByAddress(address);
    if (!user) {
      return res.status(404).json(apiResponse(undefined, 'User not found'));
    }
    res.json(apiResponse(user));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch user'));
  }
});

router.post('/api/users', validateBody(insertUserSchema), async (req, res) => {
  try {
    const user = await storage.createUser(req.body);
    res.status(201).json(apiResponse(user, undefined, 'User created successfully'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to create user'));
  }
});

router.put('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await storage.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json(apiResponse(undefined, 'User not found'));
    }
    res.json(apiResponse(user, undefined, 'User updated successfully'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to update user'));
  }
});

// Campaign routes
router.get('/api/campaigns', async (req, res) => {
  try {
    const { page = '1', limit = '10', creator, category, featured, active } = req.query;
    
    let campaigns = await storage.getAllCampaigns();
    
    // Apply filters
    if (creator) {
      const creatorId = parseInt(creator as string);
      campaigns = campaigns.filter(c => c.creatorId === creatorId);
    }
    
    if (category) {
      campaigns = campaigns.filter(c => c.category.toLowerCase() === (category as string).toLowerCase());
    }
    
    if (featured !== undefined) {
      campaigns = campaigns.filter(c => c.isFeatured === (featured === 'true'));
    }
    
    if (active !== undefined) {
      campaigns = campaigns.filter(c => c.isActive === (active === 'true'));
    }
    
    // Sort by creation date (newest first)
    campaigns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedCampaigns = campaigns.slice(startIndex, endIndex);
    
    res.json(paginatedResponse(paginatedCampaigns, campaigns.length, pageNum, limitNum));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch campaigns'));
  }
});

router.get('/api/campaigns/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const campaign = await storage.getCampaignById(id);
    if (!campaign) {
      return res.status(404).json(apiResponse(undefined, 'Campaign not found'));
    }
    
    // Get creator info and reputation
    const creator = await storage.getUserById(campaign.creatorId);
    const reputation = await storage.getReputationByUser(campaign.creatorId);
    
    // Get recent mints for this campaign
    const mints = await storage.getMintsByCampaign(campaign.id);
    
    res.json(apiResponse({
      ...campaign,
      creator,
      reputation,
      mints: mints.slice(0, 10), // Last 10 mints
    }));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch campaign'));
  }
});

router.post('/api/campaigns', validateBody(insertCampaignSchema), async (req, res) => {
  try {
    const campaign = await storage.createCampaign(req.body);
    
    // Create a basic Farcaster frame for this campaign
    await storage.createFrame({
      campaignId: campaign.id,
      frameData: {
        image: campaign.imageUrl || '',
        buttons: [
          { label: 'Mint on Zorax', action: 'post_redirect', target: `${req.get('origin')}/campaign/${campaign.id}` },
          { label: 'View Creator', action: 'link', target: `${req.get('origin')}/creator/${campaign.creatorId}` }
        ],
        postUrl: `/api/frames/${campaign.id}/interact`,
      },
    });
    
    res.status(201).json(apiResponse(campaign, undefined, 'Campaign created successfully'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to create campaign'));
  }
});

router.put('/api/campaigns/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const campaign = await storage.updateCampaign(id, req.body);
    if (!campaign) {
      return res.status(404).json(apiResponse(undefined, 'Campaign not found'));
    }
    res.json(apiResponse(campaign, undefined, 'Campaign updated successfully'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to update campaign'));
  }
});

router.delete('/api/campaigns/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await storage.deleteCampaign(id);
    if (!success) {
      return res.status(404).json(apiResponse(undefined, 'Campaign not found'));
    }
    res.json(apiResponse(undefined, undefined, 'Campaign deleted successfully'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to delete campaign'));
  }
});

// Mint routes
router.get('/api/mints', async (req, res) => {
  try {
    const { campaign, supporter } = req.query;
    
    let mints;
    if (campaign) {
      mints = await storage.getMintsByCampaign(parseInt(campaign as string));
    } else if (supporter) {
      mints = await storage.getMintsBySupporter(parseInt(supporter as string));
    } else {
      mints = await storage.getAllMints();
    }
    
    res.json(apiResponse(mints));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch mints'));
  }
});

router.post('/api/mints', validateBody(insertMintSchema), async (req, res) => {
  try {
    const mint = await storage.createMint(req.body);
    
    // Update creator reputation
    const campaign = await storage.getCampaignById(mint.campaignId);
    if (campaign) {
      const currentReputation = await storage.getReputationByUser(campaign.creatorId);
      if (currentReputation) {
        await storage.updateReputation(campaign.creatorId, {
          totalMints: currentReputation.totalMints + 1,
          totalRevenue: currentReputation.totalRevenue + mint.amount,
        });
      }
    }
    
    res.status(201).json(apiResponse(mint, undefined, 'Mint created successfully'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to create mint'));
  }
});

// Reputation routes
router.get('/api/reputation', async (req, res) => {
  try {
    const reputations = await storage.getAllReputations();
    res.json(apiResponse(reputations));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch reputations'));
  }
});

router.get('/api/reputation/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const reputation = await storage.getReputationByUser(userId);
    if (!reputation) {
      return res.status(404).json(apiResponse(undefined, 'Reputation not found'));
    }
    res.json(apiResponse(reputation));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch reputation'));
  }
});

// Frame routes
router.get('/api/frames/:campaignId', async (req, res) => {
  try {
    const campaignId = parseInt(req.params.campaignId);
    const frame = await storage.getFrameByCampaign(campaignId);
    if (!frame) {
      return res.status(404).json(apiResponse(undefined, 'Frame not found'));
    }
    res.json(apiResponse(frame));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch frame'));
  }
});

router.post('/api/frames/:campaignId/interact', async (req, res) => {
  try {
    const campaignId = parseInt(req.params.campaignId);
    const frame = await storage.updateFrameInteractions(campaignId);
    if (!frame) {
      return res.status(404).json(apiResponse(undefined, 'Frame not found'));
    }
    res.json(apiResponse(frame, undefined, 'Interaction recorded'));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to record interaction'));
  }
});

// Analytics routes
router.get('/api/analytics/overview', async (req, res) => {
  try {
    const campaigns = await storage.getAllCampaigns();
    const users = await storage.getAllUsers();
    const mints = await storage.getAllMints();
    
    const totalVolume = mints.reduce((sum, mint) => sum + mint.amount, 0);
    const activeCampaigns = campaigns.filter(c => c.isActive).length;
    
    res.json(apiResponse({
      totalCampaigns: campaigns.length,
      totalUsers: users.length,
      totalMints: mints.length,
      totalVolume,
      activeCampaigns,
    }));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch analytics'));
  }
});

// Search routes
router.get('/api/search', async (req, res) => {
  try {
    const { q, type = 'all' } = req.query;
    const query = (q as string)?.toLowerCase() || '';
    
    const results: any = {
      campaigns: [],
      users: [],
    };
    
    if (type === 'all' || type === 'campaigns') {
      const campaigns = await storage.getAllCampaigns();
      results.campaigns = campaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(query) ||
        campaign.description.toLowerCase().includes(query) ||
        campaign.category.toLowerCase().includes(query)
      );
    }
    
    if (type === 'all' || type === 'users') {
      const users = await storage.getAllUsers();
      results.users = users.filter(user =>
        user.username?.toLowerCase().includes(query) ||
        user.bio?.toLowerCase().includes(query)
      );
    }
    
    res.json(apiResponse(results));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to search'));
  }
});

export default router;