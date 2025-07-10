import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Creator } from '../types';

const router = Router();

// Validation schema for creating/updating a creator profile
const creatorProfileSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
  socialLinks: z.object({
    twitter: z.string().url('Invalid Twitter URL').optional(),
    instagram: z.string().url('Invalid Instagram URL').optional(),
    website: z.string().url('Invalid website URL').optional()
  }).optional()
});

// Sample creators data (in-memory storage for now)
const creators: Creator[] = [
  {
    id: '1',
    address: '0x1234567890123456789012345678901234567890',
    name: 'Sample Creator',
    bio: 'This is a sample creator profile',
    avatar: 'https://via.placeholder.com/150',
    socialLinks: {
      twitter: 'https://twitter.com/samplecreator',
      website: 'https://example.com'
    },
    campaignCount: 1,
    totalRaised: 250,
    createdAt: new Date().toISOString()
  }
];

// Get all creators
router.get('/', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: creators,
      total: creators.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch creators'
    });
  }
});

// Get creator by address
router.get('/:address', (req: Request, res: Response) => {
  try {
    const creator = creators.find(c => c.address.toLowerCase() === req.params.address.toLowerCase());
    
    if (!creator) {
      res.status(404).json({ error: 'Creator not found' });
      return;
    }
    
    res.json({ creator });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch creator' });
    return;
  }
});

// Create or update a creator profile
router.post('/', (req: Request, res: Response) => {
  try {
    const validationResult = creatorProfileSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      res.status(400).json({ error: 'Invalid creator data', details: validationResult.error });
      return;
    }
    
    const data = validationResult.data;
    const existingCreatorIndex = creators.findIndex(c => c.address.toLowerCase() === data.address.toLowerCase());
    
    if (existingCreatorIndex !== -1) {
      // Update existing creator
      creators[existingCreatorIndex] = {
        ...creators[existingCreatorIndex],
        ...data,
        bio: data.bio ?? '',
        avatar: data.avatar ?? '',
        socialLinks: data.socialLinks ?? {},
      };
      
      res.json({ creator: creators[existingCreatorIndex] });
      return;
    } else {
      // Create new creator
      const newCreator: Creator = {
        campaignCount: 0,
        totalRaised: 0,
        createdAt: new Date().toISOString(),
        ...data,
        bio: data.bio ?? '',
        avatar: data.avatar ?? '',
        socialLinks: data.socialLinks ?? {},
        id: String(Date.now()),
      };
      
      creators.push(newCreator);
      
      res.status(201).json({ creator: newCreator });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create/update creator' });
    return;
  }
});

export default router;
