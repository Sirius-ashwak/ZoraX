import { Router } from 'express';

const router = Router();

// Placeholder routes for creator profiles
// These will be implemented in Task 4

router.get('/', (req, res) => {
  res.json({ 
    message: 'Profile routes - Coming in Task 4',
    available_endpoints: [
      'GET /api/profiles/:address - Get creator profile',
      'GET /api/profiles/:address/metrics - Get creator metrics'
    ]
  });
});

export { router as profileRoutes };
