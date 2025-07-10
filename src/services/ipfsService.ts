import { create, IPFSHTTPClient } from 'ipfs-http-client';

export interface IPFSUploadResult {
  hash: string;
  url: string;
  size: number;
}

export interface IPFSMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

class IPFSService {
  private client: IPFSHTTPClient;

  constructor() {
    // Initialize IPFS client - using Infura IPFS gateway
    // You can also use other IPFS providers like Pinata, Web3.Storage, etc.
    this.client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: (typeof process !== 'undefined' && process.env?.VITE_INFURA_IPFS_AUTH) ? {
        authorization: `Basic ${Buffer.from(process.env.VITE_INFURA_IPFS_AUTH).toString('base64')}`
      } : {},
    });
  }

  /**
   * Upload an image file to IPFS
   */
  async uploadImage(file: File): Promise<IPFSUploadResult> {
    try {
      console.log('Uploading image to IPFS...', { name: file.name, size: file.size });

      // Convert file to buffer
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);

      // Upload to IPFS
      const result = await this.client.add(uint8Array, {
        progress: (bytes: number) => {
          console.log(`IPFS Upload progress: ${bytes} bytes`);
        },
      });

      console.log('Image uploaded to IPFS:', result);

      return {
        hash: result.cid.toString(),
        url: `https://ipfs.io/ipfs/${result.cid.toString()}`,
        size: result.size,
      };
    } catch (error) {
      console.error('Failed to upload image to IPFS:', error);
      throw new Error(`IPFS upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload JSON metadata to IPFS
   */
  async uploadMetadata(metadata: IPFSMetadata): Promise<IPFSUploadResult> {
    try {
      console.log('Uploading metadata to IPFS...', metadata);

      // Convert metadata to JSON buffer
      const jsonString = JSON.stringify(metadata, null, 2);
      const buffer = Buffer.from(jsonString);

      // Upload to IPFS
      const result = await this.client.add(buffer, {
        progress: (bytes: number) => {
          console.log(`IPFS Metadata upload progress: ${bytes} bytes`);
        },
      });

      console.log('Metadata uploaded to IPFS:', result);

      return {
        hash: result.cid.toString(),
        url: `https://ipfs.io/ipfs/${result.cid.toString()}`,
        size: result.size,
      };
    } catch (error) {
      console.error('Failed to upload metadata to IPFS:', error);
      throw new Error(`IPFS metadata upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload campaign assets (image + metadata) to IPFS
   */
  async uploadCampaignAssets(
    imageFile: File,
    metadata: Omit<IPFSMetadata, 'image'>
  ): Promise<{
    imageResult: IPFSUploadResult;
    metadataResult: IPFSUploadResult;
  }> {
    try {
      // First upload the image
      const imageResult = await this.uploadImage(imageFile);

      // Then upload metadata with the image URL
      const fullMetadata: IPFSMetadata = {
        ...metadata,
        image: imageResult.url,
      };

      const metadataResult = await this.uploadMetadata(fullMetadata);

      return {
        imageResult,
        metadataResult,
      };
    } catch (error) {
      console.error('Failed to upload campaign assets:', error);
      throw new Error(`Campaign assets upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Retrieve content from IPFS
   */
  async getContent(hash: string): Promise<string> {
    try {
      const chunks = [];
      for await (const chunk of this.client.cat(hash)) {
        chunks.push(chunk);
      }
      
      const buffer = Buffer.concat(chunks);
      return buffer.toString();
    } catch (error) {
      console.error('Failed to retrieve content from IPFS:', error);
      throw new Error(`IPFS retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Pin content to ensure it stays available
   */
  async pinContent(hash: string): Promise<void> {
    try {
      await this.client.pin.add(hash);
      console.log(`Content pinned: ${hash}`);
    } catch (error) {
      console.error('Failed to pin content:', error);
      throw new Error(`IPFS pinning failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get IPFS gateway URL for a hash
   */
  getGatewayUrl(hash: string): string {
    return `https://ipfs.io/ipfs/${hash}`;
  }

  /**
   * Validate IPFS hash format
   */
  isValidHash(hash: string): boolean {
    // Basic validation for IPFS hash (CIDv0 and CIDv1)
    const cidV0Regex = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
    const cidV1Regex = /^b[a-z2-7]{58}$/;
    
    return cidV0Regex.test(hash) || cidV1Regex.test(hash);
  }
}

// Export singleton instance
export const ipfsService = new IPFSService();

// Helper function to create NFT metadata from campaign data
export function createNFTMetadata(
  campaignData: {
    nftName: string;
    description: string;
    supply: number;
    priceETH: string;
    royaltyPercentage: number;
    perkDescription: string;
  }
): Omit<IPFSMetadata, 'image'> {
  return {
    name: campaignData.nftName,
    description: campaignData.description,
    attributes: [
      {
        trait_type: 'Supply',
        value: campaignData.supply,
      },
      {
        trait_type: 'Price (ETH)',
        value: campaignData.priceETH,
      },
      {
        trait_type: 'Royalty (%)',
        value: campaignData.royaltyPercentage,
      },
      {
        trait_type: 'Perk',
        value: campaignData.perkDescription,
      },
    ],
  };
}
