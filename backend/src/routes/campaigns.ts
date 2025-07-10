import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Mock campaign data for cosmic platform
const mockCampaigns = [
  {
    id: 1,
    title: 'Cosmic Art Collection',
    description: 'A stunning collection of cosmic art pieces',
    creator: '0x1234...5678',
    price: '0.1 ETH',
    raised: '2.5 ETH',
    supporters: 42,
    status: 'active',
    imageUri: 'https://via.placeholder.com/400x300?text=Cosmic+Art',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Space Exploration NFT',
    description: 'Journey through the cosmos with these unique NFTs',
    creator: '0x9876...5432',
    price: '0.2 ETH',
    raised: '5.2 ETH',
    supporters: 89,
    status: 'completed',
    imageUri: 'https://via.placeholder.com/400x300?text=Space+NFT',
    createdAt: new Date().toISOString(),
  }
];

// GET /api/campaigns - Get all campaigns
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockCampaigns,
    total: mockCampaigns.length
  });
});

// GET /api/campaigns/:id - Get campaign by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const campaign = mockCampaigns.find(c => c.id === id);
  
  if (!campaign) {
    return res.status(404).json({
      success: false,
      error: 'Campaign not found'
    });
  }
  
  res.json({
    success: true,
    data: campaign
  });
});

// POST /api/campaigns - Create new campaign
router.post('/', (req, res) => {
  try {
    const campaignSchema = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      price: z.string(),
      creator: z.string(),
    });
    
    const data = campaignSchema.parse(req.body);
    
    const newCampaign = {
      id: mockCampaigns.length + 1,
      ...data,
      raised: '0 ETH',
      supporters: 0,
      status: 'active',
      imageUri: 'https://via.placeholder.com/400x300?text=New+Campaign',
      createdAt: new Date().toISOString(),
    };
    
    mockCampaigns.push(newCampaign);
    
    res.status(201).json({
      success: true,
      data: newCampaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid campaign data',
      details: error instanceof z.ZodError ? error.errors : 'Unknown error'
    });
  }
});

export default router;