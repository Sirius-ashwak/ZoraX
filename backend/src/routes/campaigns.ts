import express from 'express';
import multer from 'multer';
import { z } from 'zod';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// Campaign creation schema
const createCampaignSchema = z.object({
  nftName: z.string().min(3).max(50),
  nftSymbol: z.string().min(2).max(10),
  description: z.string().min(50).max(500),
  duration: z.number().int().min(1).max(365).default(30),
  supply: z.number().int().min(1).max(10000),
  priceETH: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, { message: "Price must be a valid number greater than 0" }),
  priceUSDC: z.string().optional(),
  royaltyPercentage: z.number().min(0).max(10).default(5),
  perkDescription: z.string().max(1000),
});

// Interface for campaign data
interface CampaignMetadata {
  id: string;
  creatorAddress: string;
  contractAddress?: string;
  transactionHash?: string;
  nftName: string;
  nftSymbol: string;
  description: string;
  duration: number;
  supply: number;
  priceETH: string;
  priceUSDC?: string;
  royaltyPercentage: number;
  imageIPFSHash?: string;
  metadataIPFSHash?: string;
  perkDescription: string;
  status: 'draft' | 'uploading' | 'deploying' | 'active' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  deploymentResult?: any;
}

// In-memory storage (replace with database in production)
const campaigns: CampaignMetadata[] = [];

// Create new campaign
router.post('/', upload.single('imageFile'), async (req, res) => {
  try {
    // Get wallet address from header
    const walletAddress = req.headers['x-wallet-address'] as string;
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Parse and validate form data
    const formData = {
      nftName: req.body.nftName,
      nftSymbol: req.body.nftSymbol,
      description: req.body.description,
      duration: parseInt(req.body.duration) || 30,
      supply: parseInt(req.body.supply),
      priceETH: req.body.priceETH,
      priceUSDC: req.body.priceUSDC,
      royaltyPercentage: parseFloat(req.body.royaltyPercentage) || 5,
      perkDescription: req.body.perkDescription || '',
    };

    const validatedData = createCampaignSchema.parse(formData);

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Generate campaign ID
    const campaignId = `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create campaign object
    const campaign: CampaignMetadata = {
      id: campaignId,
      creatorAddress: walletAddress,
      // contractAddress and transactionHash will be set during deployment
      nftName: validatedData.nftName,
      nftSymbol: validatedData.nftSymbol,
      description: validatedData.description,
      duration: validatedData.duration,
      supply: validatedData.supply,
      priceETH: validatedData.priceETH,
      ...(validatedData.priceUSDC && { priceUSDC: validatedData.priceUSDC }),
      royaltyPercentage: validatedData.royaltyPercentage,
      perkDescription: validatedData.perkDescription,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store file info
    if (req.file) {
      campaign.imageIPFSHash = req.file.filename;
    }

    // Add to storage
    campaigns.push(campaign);

    console.log('Campaign created:', campaign);

    return res.status(201).json({
      success: true,
      campaign: {
        id: campaign.id,
        status: campaign.status,
        createdAt: campaign.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
    }

    return res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Get campaigns for a creator
router.get('/', (req, res) => {
  try {
    const walletAddress = req.headers['x-wallet-address'] as string;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    const userCampaigns = campaigns.filter(
      campaign => campaign.creatorAddress.toLowerCase() === walletAddress.toLowerCase()
    );

    return res.json({
      success: true,
      campaigns: userCampaigns,
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Get single campaign
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const campaign = campaigns.find(c => c.id === id);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    return res.json({
      success: true,
      campaign,
    });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// Update campaign status endpoint
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['draft', 'uploading', 'deploying', 'active', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find campaign
    const campaignIndex = campaigns.findIndex(c => c.id === id);
    if (campaignIndex === -1) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Update status
    campaigns[campaignIndex].status = status;
    campaigns[campaignIndex].updatedAt = new Date().toISOString();

    return res.json({ 
      success: true, 
      campaign: campaigns[campaignIndex] 
    });
  } catch (error) {
    console.error('Error updating campaign status:', error);
    return res.status(500).json({ error: 'Failed to update campaign status' });
  }
});

// Update campaign after deployment endpoint
router.patch('/:id/deployment', (req, res) => {
  try {
    const { id } = req.params;
    const { contractAddress, transactionHash, status, deploymentResult } = req.body;

    // Find campaign
    const campaignIndex = campaigns.findIndex(c => c.id === id);
    if (campaignIndex === -1) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Update with deployment information
    campaigns[campaignIndex] = {
      ...campaigns[campaignIndex],
      contractAddress,
      transactionHash,
      status,
      deploymentResult,
      updatedAt: new Date().toISOString(),
    };

    return res.json({ 
      success: true, 
      campaign: campaigns[campaignIndex] 
    });
  } catch (error) {
    console.error('Error updating campaign deployment:', error);
    return res.status(500).json({ error: 'Failed to update campaign deployment' });
  }
});

export { router as campaignRoutes };
