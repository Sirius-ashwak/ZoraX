import { Campaign } from '../models/Campaign';

export interface FrameMetadata {
  title: string;
  description: string;
  image: string;
  buttons: FrameButton[];
  postUrl: string;
  inputText?: string;
}

export interface FrameButton {
  label: string;
  action: 'post' | 'link' | 'tx';
  target?: string;
}

export interface FrameGenerationRequest {
  campaignId: string;
  contractAddress: string;
}

export interface FrameGenerationResponse {
  frameUrl: string;
  metadata: FrameMetadata;
}

export interface FrameAnalytics {
  views: number;
  interactions: number;
  mints: number;
  conversionRate: number;
  topReferrers: Array<{
    source: string;
    views: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    views: number;
    interactions: number;
    mints: number;
  }>;
}

export class FrameService {
  private static instance: FrameService;
  private baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  private apiUrl = process.env.BACKEND_URL || 'http://localhost:3001';

  public static getInstance(): FrameService {
    if (!FrameService.instance) {
      FrameService.instance = new FrameService();
    }
    return FrameService.instance;
  }

  /**
   * Generate Farcaster Frame URL and metadata for a campaign
   */
  async generateFrame(request: FrameGenerationRequest): Promise<FrameGenerationResponse> {
    try {
      // For now, we'll create a mock campaign or fetch from database
      const campaign = await this.getCampaignData(request.campaignId);
      
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const frameUrl = `${this.baseUrl}/frames/campaign/${request.campaignId}`;
      const imageUrl = await this.generateFrameImage(campaign);
      
      const metadata: FrameMetadata = {
        title: campaign.title,
        description: `Mint "${campaign.title}" by ${campaign.creator} for ${campaign.price} ETH`,
        image: imageUrl,
        buttons: [
          {
            label: 'Mint Now',
            action: 'tx',
            target: `${this.apiUrl}/api/frames/mint`
          },
          {
            label: 'View Campaign',
            action: 'link',
            target: `${this.baseUrl}/campaign/${request.campaignId}`
          }
        ],
        postUrl: `${this.apiUrl}/api/frames/callback`,
        inputText: 'Quantity to mint (optional)'
      };

      return {
        frameUrl,
        metadata
      };
    } catch (error) {
      console.error('Error generating Frame:', error);
      throw error;
    }
  }

  /**
   * Generate Frame preview metadata
   */
  async generateFramePreview(campaignId: string): Promise<{ metadata: FrameMetadata }> {
    try {
      const campaign = await this.getCampaignData(campaignId);
      
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const imageUrl = await this.generateFrameImage(campaign);
      
      const metadata: FrameMetadata = {
        title: campaign.title,
        description: `Mint "${campaign.title}" by ${campaign.creator} for ${campaign.price} ETH`,
        image: imageUrl,
        buttons: [
          {
            label: 'Mint Now',
            action: 'tx'
          },
          {
            label: 'View Campaign',
            action: 'link',
            target: `${this.baseUrl}/campaign/${campaignId}`
          }
        ],
        postUrl: `${this.apiUrl}/api/frames/callback`
      };

      return { metadata };
    } catch (error) {
      console.error('Error generating Frame preview:', error);
      throw error;
    }
  }

  /**
   * Generate Frame image with campaign details
   */
  private async generateFrameImage(campaign: any): Promise<string> {
    // For now, return the campaign's existing image
    // In a full implementation, this would generate a dynamic image
    // with campaign details, branding, and call-to-action
    
    if (campaign.imageUri) {
      return campaign.imageUri;
    }

    // Fallback to generated image URL
    const encodedTitle = encodeURIComponent(campaign.title);
    const encodedCreator = encodeURIComponent(campaign.creator);
    
    return `https://via.placeholder.com/600x314/6366f1/ffffff?text=${encodedTitle}+by+${encodedCreator}`;
  }

  /**
   * Get campaign data - mock implementation
   */
  private async getCampaignData(campaignId: string): Promise<any> {
    // Mock campaign data - in production, this would fetch from database
    return {
      id: campaignId,
      title: 'Amazing NFT Collection',
      creator: 'Creator Name',
      description: 'This is an amazing NFT collection that you should mint!',
      imageUri: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '0.01',
      totalSupply: 1000,
      minted: 150,
      endTime: Date.now() + 86400 * 30 * 1000, // 30 days from now
      isActive: true
    };
  }

  /**
   * Process Frame mint transaction
   */
  async processMintTransaction(
    campaignId: string,
    userAddress: string,
    quantity: number = 1
  ): Promise<{ transactionHash: string; status: string }> {
    try {
      const campaign = await this.getCampaignData(campaignId);
      
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      if (!campaign.isActive) {
        throw new Error('Campaign is not active');
      }

      // Mock transaction processing
      // In production, this would interact with the blockchain
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      console.log(`Processing mint transaction for campaign ${campaignId}:`, {
        userAddress,
        quantity,
        transactionHash
      });

      return {
        transactionHash,
        status: 'success'
      };
    } catch (error) {
      console.error('Error processing mint transaction:', error);
      throw error;
    }
  }

  /**
   * Get Frame analytics data
   */
  async getFrameAnalytics(campaignId: string, timeRange: '24h' | '7d' | '30d'): Promise<FrameAnalytics> {
    try {
      // Mock analytics data - in production, this would fetch from analytics database
      const views = Math.floor(Math.random() * 2000) + 500;
      const interactions = Math.floor(views * 0.15);
      const mints = Math.floor(interactions * 0.25);
      const conversionRate = ((mints / views) * 100);

      return {
        views,
        interactions,
        mints,
        conversionRate: Number(conversionRate.toFixed(1)),
        topReferrers: [
          { source: 'Farcaster', views: Math.floor(views * 0.7) },
          { source: 'Direct', views: Math.floor(views * 0.2) },
          { source: 'Twitter', views: Math.floor(views * 0.1) }
        ],
        timeSeriesData: this.generateTimeSeriesData(timeRange)
      };
    } catch (error) {
      console.error('Error getting Frame analytics:', error);
      throw error;
    }
  }

  /**
   * Generate mock time series data
   */
  private generateTimeSeriesData(timeRange: '24h' | '7d' | '30d') {
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20,
        interactions: Math.floor(Math.random() * 20) + 2,
        mints: Math.floor(Math.random() * 5) + 1
      });
    }
    
    return data;
  }

  /**
   * Track Frame view event
   */
  async trackFrameView(campaignId: string, userAgent?: string, referrer?: string): Promise<void> {
    try {
      // Mock tracking - in production, this would save to analytics database
      console.log('Frame view tracked:', {
        campaignId,
        userAgent,
        referrer,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking Frame view:', error);
    }
  }

  /**
   * Track Frame interaction event
   */
  async trackFrameInteraction(
    campaignId: string,
    action: string,
    userAddress?: string
  ): Promise<void> {
    try {
      // Mock tracking - in production, this would save to analytics database
      console.log('Frame interaction tracked:', {
        campaignId,
        action,
        userAddress,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking Frame interaction:', error);
    }
  }

  /**
   * Generate Frame HTML for direct access
   */
  generateFrameHtml(metadata: FrameMetadata): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${metadata.title}</title>
          
          <!-- Farcaster Frame Meta Tags -->
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${metadata.image}" />
          <meta property="fc:frame:post_url" content="${metadata.postUrl}" />
          
          ${metadata.buttons.map((button, index) => `
            <meta property="fc:frame:button:${index + 1}" content="${button.label}" />
            <meta property="fc:frame:button:${index + 1}:action" content="${button.action}" />
            ${button.target ? `<meta property="fc:frame:button:${index + 1}:target" content="${button.target}" />` : ''}
          `).join('')}
          
          ${metadata.inputText ? `<meta property="fc:frame:input:text" content="${metadata.inputText}" />` : ''}
          
          <!-- OpenGraph Meta Tags -->
          <meta property="og:title" content="${metadata.title}" />
          <meta property="og:description" content="${metadata.description}" />
          <meta property="og:image" content="${metadata.image}" />
          <meta property="og:type" content="website" />
          
          <!-- Twitter Meta Tags -->
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${metadata.title}" />
          <meta name="twitter:description" content="${metadata.description}" />
          <meta name="twitter:image" content="${metadata.image}" />
        </head>
        <body>
          <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f3f4f6;">
            <div style="text-align: center; max-width: 600px; padding: 2rem;">
              <img src="${metadata.image}" alt="${metadata.title}" style="width: 100%; max-width: 600px; border-radius: 8px; margin-bottom: 1rem;" />
              <h1 style="color: #1f2937; margin-bottom: 0.5rem;">${metadata.title}</h1>
              <p style="color: #6b7280; margin-bottom: 1rem;">${metadata.description}</p>
              <p style="color: #9ca3af; font-size: 0.875rem;">View this as a Frame on Farcaster for interactive minting</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

export const frameService = FrameService.getInstance();
