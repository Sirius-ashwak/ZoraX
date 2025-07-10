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
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockCreators,
    total: mockCreators.length
  });
});

// GET /api/creators/:address - Get creator by address
router.get('/:address', (req, res) => {
  const address = req.params.address;
  const creator = mockCreators.find(c => c.address === address);
  
  if (!creator) {
    return res.status(404).json({
      success: false,
      error: 'Creator not found'
    });
  }
  
  res.json({
    success: true,
    data: creator
  });
});

// GET /api/creators/:address/reputation - Get creator reputation
router.get('/:address/reputation', (req, res) => {
  const address = req.params.address;
  const creator = mockCreators.find(c => c.address === address);
  
  if (!creator) {
    return res.status(404).json({
      success: false,
      error: 'Creator not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      zoracredScore: creator.zoracredScore,
      reputation: creator.reputation,
      campaigns: creator.campaigns,
      supporters: creator.supporters,
      totalRaised: creator.totalRaised,
      verified: creator.verified,
    }
  });
});

export default router;