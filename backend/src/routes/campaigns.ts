import { Router } from 'express';
import { z } from 'zod';
import { Campaign } from '../types';

const router = Router();

// Validation schema for creating/updating a campaign
const campaignSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  goalAmount: z.number().positive('Goal amount must be positive'),
  duration: z.number().int().positive('Duration must be a positive integer'),
  creatorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
});

// Sample campaigns data (in-memory storage for now)
const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Sample Campaign',
    description: 'This is a sample campaign for testing purposes',
    goalAmount: 1000,
    raisedAmount: 250,
    duration: 30,
    creatorAddress: '0x1234567890123456789012345678901234567890',
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

// Get all campaigns
router.get('/', (_req, res) => {
  try {
    res.json({
      success: true,
      data: campaigns,
      total: campaigns.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch campaigns'
    });
  }
});

// Get campaign by ID
router.get('/:id', (req, res) => {
  try {
    const campaign = campaigns.find(c => c.id === req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }
    
    return res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch campaign'
    });
  }
});

// Create a new campaign
router.post('/', (req, res) => {
  try {
    const validationResult = campaignSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.format()
      });
    }
    
    const newCampaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      ...validationResult.data,
      raisedAmount: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    campaigns.push(newCampaign);
    
    return res.status(201).json({
      success: true,
      data: newCampaign,
      message: 'Campaign created successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to create campaign'
    });
  }
});

export default router;
