import { Router } from 'express';
import { frameService } from '../services/frameService';
import { transactionService } from '../services/transactionService';
import { analyticsService } from '../services/analyticsService';
import { imageService } from '../services/imageService';

const router = Router();

/**
 * POST /api/frames/generate
 * Generate Farcaster Frame URL and metadata for a campaign
 */
router.post('/generate', async (req, res) => {
  try {
    const { campaignId, contractAddress } = req.body;
    
    if (!campaignId) {
      return res.status(400).json({ error: 'Campaign ID is required' });
    }

    const frameData = await frameService.generateFrame({
      campaignId,
      contractAddress: contractAddress || ''
    });

    // Track frame generation
    await analyticsService.trackFrameView(
      campaignId,
      req.get('User-Agent'),
      req.get('Referer')
    );

    res.json(frameData);
    return;
  } catch (error) {
    console.error('Error generating Frame:', error);
    res.status(500).json({ 
      error: 'Failed to generate Frame',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
});

/**
 * GET /api/frames/preview/:campaignId
 * Get Frame preview metadata for a campaign
 */
router.get('/preview/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const previewData = await frameService.generateFramePreview(campaignId);
    
    res.json(previewData);
  } catch (error) {
    console.error('Error getting Frame preview:', error);
    res.status(500).json({ 
      error: 'Failed to get Frame preview',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/frames/mint
 * Process mint transaction from Farcaster Frame
 */
router.post('/mint', async (req, res) => {
  try {
    const { campaignId, userAddress, quantity = 1 } = req.body;
    
    if (!campaignId || !userAddress) {
      return res.status(400).json({ 
        error: 'Campaign ID and user address are required' 
      });
    }

    // Process the mint transaction
    const referrer = req.get('Referer');
    const result = await transactionService.processMintTransaction({
      campaignId,
      userAddress,
      quantity: parseInt(quantity),
      ...(referrer && { referrer })
    });

    // Track the mint event
    if (result.status === 'success') {
      await analyticsService.trackMintEvent(
        campaignId,
        userAddress,
        quantity,
        result.transactionHash
      );
    } else {
      await analyticsService.trackErrorEvent(
        campaignId,
        result.errorMessage || 'Mint failed',
        userAddress
      );
    }

    res.json(result);
    return;
  } catch (error) {
    console.error('Error processing mint:', error);
    
    // Track error event
    const { campaignId, userAddress } = req.body;
    if (campaignId) {
      await analyticsService.trackErrorEvent(
        campaignId,
        error instanceof Error ? error.message : 'Unknown error',
        userAddress
      );
    }

    res.status(500).json({ 
      error: 'Failed to process mint',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
});

/**
 * POST /api/frames/callback
 * Handle Frame button interactions
 */
router.post('/callback', async (req, res) => {
  try {
    const { campaignId, action, userAddress } = req.body;
    
    if (!campaignId || !action) {
      return res.status(400).json({ 
        error: 'Campaign ID and action are required' 
      });
    }

    // Track the interaction
    await analyticsService.trackFrameInteraction(
      campaignId,
      action,
      userAddress,
      { 
        timestamp: Date.now(),
        userAgent: req.get('User-Agent'),
        referer: req.get('Referer')
      }
    );

    // Handle different actions
    switch (action) {
      case 'view_campaign':
        res.json({ 
          success: true, 
          redirectUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/campaign/${campaignId}`
        });
        break;
      
      case 'mint':
        // This would trigger the mint flow
        res.json({ 
          success: true, 
          message: 'Mint action processed' 
        });
        break;
      
      default:
        res.json({ 
          success: true, 
          message: 'Action processed' 
        });
        break;
    }
    return;
  } catch (error) {
    console.error('Error handling Frame callback:', error);
    res.status(500).json({ 
      error: 'Failed to process callback',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
});

/**
 * GET /api/frames/analytics/:campaignId
 * Get Frame analytics for a campaign
 */
router.get('/analytics/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { timeRange = '7d' } = req.query;
    
    const analytics = await analyticsService.getFrameAnalytics(
      campaignId,
      timeRange as '24h' | '7d' | '30d'
    );
    
    res.json(analytics);
  } catch (error) {
    console.error('Error getting Frame analytics:', error);
    res.status(500).json({ 
      error: 'Failed to get analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/frames/analytics/:campaignId/realtime
 * Get real-time Frame analytics
 */
router.get('/analytics/:campaignId/realtime', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const analytics = await analyticsService.getRealTimeAnalytics(campaignId);
    
    res.json(analytics);
  } catch (error) {
    console.error('Error getting real-time analytics:', error);
    res.status(500).json({ 
      error: 'Failed to get real-time analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/frames/transaction/:hash
 * Get transaction status
 */
router.get('/transaction/:hash', async (req, res) => {
  try {
    const { hash } = req.params;
    
    const status = await transactionService.getTransactionStatus(hash);
    
    res.json(status);
  } catch (error) {
    console.error('Error getting transaction status:', error);
    res.status(500).json({ 
      error: 'Failed to get transaction status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/frames/image/generate
 * Generate dynamic Frame image
 */
router.post('/image/generate', async (req, res) => {
  try {
    const { campaignTitle, creatorName, mintPrice, campaignImage } = req.body;
    
    if (!campaignTitle || !creatorName || !mintPrice) {
      return res.status(400).json({ 
        error: 'Campaign title, creator name, and mint price are required' 
      });
    }

    const image = await imageService.generateFrameImage({
      campaignTitle,
      creatorName,
      mintPrice,
      campaignImage
    });
    
    res.json(image);
    return;
  } catch (error) {
    console.error('Error generating Frame image:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
});

/**
 * GET /api/frames/campaign/:campaignId
 * Serve Frame HTML for direct access
 */
router.get('/campaign/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    // Generate frame metadata
    const frameData = await frameService.generateFramePreview(campaignId);
    
    // Generate HTML with proper meta tags
    const html = frameService.generateFrameHtml(frameData.metadata);
    
    // Track frame view
    await analyticsService.trackFrameView(
      campaignId,
      req.get('User-Agent'),
      req.get('Referer')
    );
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error serving Frame HTML:', error);
    res.status(500).send(`
      <html>
        <head><title>Frame Error</title></head>
        <body>
          <h1>Error loading Frame</h1>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        </body>
      </html>
    `);
  }
});

/**
 * GET /api/frames/
 * Frame routes overview
 */
router.get('/', (_req, res) => {
  res.json({ 
    message: 'CredVault Farcaster Frame API',
    version: '1.0.0',
    endpoints: {
      'POST /api/frames/generate': 'Generate Farcaster Frame for campaign',
      'GET /api/frames/preview/:campaignId': 'Get Frame preview metadata',
      'POST /api/frames/mint': 'Process Frame mint transaction',
      'POST /api/frames/callback': 'Handle Frame button interactions',
      'GET /api/frames/analytics/:campaignId': 'Get Frame analytics',
      'GET /api/frames/analytics/:campaignId/realtime': 'Get real-time analytics',
      'GET /api/frames/transaction/:hash': 'Get transaction status',
      'POST /api/frames/image/generate': 'Generate dynamic Frame image',
      'GET /api/frames/campaign/:campaignId': 'Serve Frame HTML'
    },
    status: 'active'
  });
});

export { router as frameRoutes };
