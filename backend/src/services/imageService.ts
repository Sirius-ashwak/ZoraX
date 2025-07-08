export interface ImageGenerationOptions {
  campaignTitle: string;
  creatorName: string;
  mintPrice: string;
  totalSupply?: number;
  mintedCount?: number;
  campaignImage?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  format: string;
}

export class ImageService {
  private static instance: ImageService;
  // @ts-ignore - baseUrl for future use
  private baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  /**
   * Generate dynamic Frame image
   * For now, this creates a URL with parameters for a placeholder service
   * In production, this would use Canvas API or an image generation service
   */
  async generateFrameImage(options: ImageGenerationOptions): Promise<GeneratedImage> {
    try {
      // If campaign has an existing image, use it as base
      if (options.campaignImage) {
        return {
          url: options.campaignImage,
          width: 600,
          height: 314,
          format: 'jpeg'
        };
      }

      // Generate dynamic image URL
      const imageUrl = this.createPlaceholderImageUrl(options);
      
      return {
        url: imageUrl,
        width: 600,
        height: 314,
        format: 'png'
      };
    } catch (error) {
      console.error('Error generating Frame image:', error);
      throw error;
    }
  }

  /**
   * Create placeholder image URL with campaign details
   */
  private createPlaceholderImageUrl(options: ImageGenerationOptions): string {
    const {
      campaignTitle,
      creatorName,
      mintPrice,
      totalSupply,
      mintedCount,
      backgroundColor = '6366f1',
      textColor = 'ffffff'
    } = options;

    // Create text for the image
    const title = this.truncateText(campaignTitle, 30);
    const creator = this.truncateText(creatorName, 20);
    const price = `${mintPrice} ETH`;
    
    let supply = '';
    if (totalSupply && mintedCount !== undefined) {
      supply = ` | ${mintedCount}/${totalSupply} minted`;
    }

    const text = `${title} by ${creator} - ${price}${supply}`;
    const encodedText = encodeURIComponent(text);

    return `https://via.placeholder.com/600x314/${backgroundColor}/${textColor}?text=${encodedText}`;
  }

  /**
   * Generate Frame image using Canvas (for future implementation)
   */
  async generateCanvasImage(_options: ImageGenerationOptions): Promise<GeneratedImage> {
    // This would be implemented with a proper Canvas library
    // For server-side image generation (node-canvas, puppeteer, etc.)
    
    throw new Error('Canvas image generation not implemented yet');
  }

  /**
   * Generate Frame image with overlay
   */
  async generateImageWithOverlay(
    baseImageUrl: string,
    _overlayOptions: {
      title: string;
      creator: string;
      price: string;
      ctaText?: string;
    }
  ): Promise<GeneratedImage> {
    // This would overlay text/graphics on top of the base campaign image
    // For now, return the base image
    
    return {
      url: baseImageUrl,
      width: 600,
      height: 314,
      format: 'jpeg'
    };
  }

  /**
   * Optimize image for Farcaster Frame requirements
   */
  async optimizeForFrame(imageUrl: string): Promise<GeneratedImage> {
    // Farcaster Frame image requirements:
    // - Aspect ratio: 1.91:1 (recommended)
    // - Max size: 10MB
    // - Formats: PNG, JPEG, GIF, WebP
    // - Minimum dimensions: 600x314px
    
    // For now, return the original image
    // In production, this would resize/optimize the image
    
    return {
      url: imageUrl,
      width: 600,
      height: 314,
      format: 'jpeg'
    };
  }

  /**
   * Create branded Frame image template
   */
  async createBrandedTemplate(options: ImageGenerationOptions): Promise<GeneratedImage> {
    const brandColor = '6366f1'; // Purple brand color
    // @ts-ignore - accentColor for future use
    const accentColor = '8b5cf6'; // Lighter purple
    
    // Create a more sophisticated placeholder URL with CredVault branding
    const title = this.truncateText(options.campaignTitle, 25);
    const creator = this.truncateText(options.creatorName, 18);
    
    // Encode text for URL
    const mainText = encodeURIComponent(`${title}`);
    const subText = encodeURIComponent(`by ${creator} • ${options.mintPrice} ETH • CredVault`);
    
    // For now, use a placeholder service
    // In production, this would generate a properly branded image
    const imageUrl = `https://via.placeholder.com/600x314/${brandColor}/ffffff?text=${mainText}+%0A+${subText}`;
    
    return {
      url: imageUrl,
      width: 600,
      height: 314,
      format: 'png'
    };
  }

  /**
   * Generate success Frame image (after mint)
   */
  async generateSuccessImage(options: {
    campaignTitle: string;
    creatorName: string;
    mintedCount: number;
    transactionHash?: string;
  }): Promise<GeneratedImage> {
    const { campaignTitle, creatorName, mintedCount } = options;
    
    const title = this.truncateText(campaignTitle, 25);
    const creator = this.truncateText(creatorName, 18);
    const successText = encodeURIComponent(`✅ Successfully minted ${title} by ${creator}! You are supporter #${mintedCount}`);
    
    const imageUrl = `https://via.placeholder.com/600x314/10b981/ffffff?text=${successText}`;
    
    return {
      url: imageUrl,
      width: 600,
      height: 314,
      format: 'png'
    };
  }

  /**
   * Generate error Frame image
   */
  async generateErrorImage(options: {
    errorMessage: string;
    campaignTitle?: string;
  }): Promise<GeneratedImage> {
    const { errorMessage } = options;
    
    const errorText = encodeURIComponent(`❌ Error: ${errorMessage} | Try again or visit CredVault directly`);
    
    const imageUrl = `https://via.placeholder.com/600x314/ef4444/ffffff?text=${errorText}`;
    
    return {
      url: imageUrl,
      width: 600,
      height: 314,
      format: 'png'
    };
  }

  /**
   * Utility function to truncate text
   */
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + '...';
  }

  /**
   * Get image dimensions from URL
   */
  async getImageDimensions(_imageUrl: string): Promise<{ width: number; height: number }> {
    // In production, this would fetch the image and get actual dimensions
    // For now, return default Frame dimensions
    return {
      width: 600,
      height: 314
    };
  }

  /**
   * Validate image for Frame compatibility
   */
  validateFrameImage(imageUrl: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch {
      errors.push('Invalid image URL');
    }

    // Check for supported formats (basic check)
    const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const hasValidFormat = supportedFormats.some(format => 
      imageUrl.toLowerCase().includes(format)
    );
    
    if (!hasValidFormat && !imageUrl.includes('placeholder')) {
      errors.push('Image format may not be supported. Use JPG, PNG, GIF, or WebP');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Cache generated images (for future implementation)
   */
  // @ts-ignore - Methods for future use
  private async cacheImage(_imageKey: string, _imageData: Buffer): Promise<string> {
    // This would cache the generated image and return a URL
    // Implementation would depend on storage solution (S3, IPFS, etc.)
    throw new Error('Image caching not implemented yet');
  }

  /**
   * Generate image cache key
   */
  // @ts-ignore - Methods for future use
  private generateCacheKey(_options: ImageGenerationOptions): string {
    return `frame-image-${JSON.stringify(_options)}-${Date.now()}`;
  }
}

export const imageService = ImageService.getInstance();
