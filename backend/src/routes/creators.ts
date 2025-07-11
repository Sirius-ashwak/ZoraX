import express from 'express';

const router = express.Router();

// Mock creator data for cosmic platform
const mockCreators = [
  {
    id: 1,
    address: '0x1234...5678',
    name: 'CosmicArtist',
    bio: 'Creating stunning cosmic art in the Web3 space',
    avatar: 'https://via.placeholder.com/150x150?text=CA',
    zoracredScore: 750,
    reputation: 'Expert',
    campaigns: 5,
    supporters: 127,
    totalRaised: '12.5 ETH',
    verified: true,
  },
  {
    id: 2,
    address: '0x9876...5432',
    name: 'SpaceExplorer',
    bio: 'Exploring the digital cosmos through NFTs',
    avatar: 'https://via.placeholder.com/150x150?text=SE',
    zoracredScore: 892,
    reputation: 'Legend',
    campaigns: 8,
    supporters: 234,
    totalRaised: '25.8 ETH',
    verified: true,
  }
];

// GET /api/creators - Get all creators
router.get('/', (_req, res) => {
  try {
    return res.json({
      success: true,
      data: mockCreators,
      total: mockCreators.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch creators'
    });
  }
});

// GET /api/creators/:address - Get creator by address
router.get('/:address', (req, res) => {
  try {
    const creator = mockCreators.find(c => c.address === req.params.address);
    if (!creator) {
      return res.status(404).json({
        success: false,
        error: 'Creator not found'
      });
    }
    return res.json({
      success: true,
      data: creator
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch creator'
    });
  }
});

// GET /api/creators/:address/reputation - Get creator reputation
router.get('/:address/reputation', (req, res) => {
  try {
    const creator = mockCreators.find(c => c.address === req.params.address);
    if (!creator) {
      return res.status(404).json({
        success: false,
        error: 'Creator not found'
      });
    }
    // Replace with actual reputation logic
    return res.json({
      success: true,
      data: { reputation: 100, badges: [] }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch reputation'
    });
  }
});

export default router;