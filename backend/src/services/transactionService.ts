export interface MintTransactionRequest {
  campaignId: string;
  userAddress: string;
  quantity: number;
  contractAddress?: string;
  referrer?: string;
}

export interface TransactionResult {
  transactionHash: string;
  status: 'pending' | 'success' | 'failed';
  blockNumber?: number;
  gasUsed?: string;
  effectiveGasPrice?: string;
  errorMessage?: string;
  nextFrameUrl?: string;
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  blockNumber?: number;
  gasUsed?: string;
  gasPrice?: string;
  timestamp?: number;
}

export class TransactionService {
  private static instance: TransactionService;
  private baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  /**
   * Process mint transaction for Farcaster Frame
   */
  async processMintTransaction(request: MintTransactionRequest): Promise<TransactionResult> {
    try {
      console.log('Processing mint transaction:', request);

      // Validate request
      const validation = this.validateMintRequest(request);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Get campaign data
      const campaign = await this.getCampaignData(request.campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      if (!campaign.isActive) {
        throw new Error('Campaign is not active');
      }

      // Check if campaign has supply left
      if (campaign.totalSupply && campaign.minted >= campaign.totalSupply) {
        throw new Error('Campaign is sold out');
      }

      // Check if user can mint the requested quantity
      const remainingSupply = campaign.totalSupply ? campaign.totalSupply - campaign.minted : Infinity;
      if (request.quantity > remainingSupply) {
        throw new Error(`Only ${remainingSupply} tokens remaining`);
      }

      // Simulate blockchain transaction
      const transactionHash = this.generateMockTransactionHash();
      
      // Log the transaction attempt
      await this.logTransactionAttempt(request, transactionHash);

      // In production, this would:
      // 1. Interact with the smart contract
      // 2. Submit the mint transaction
      // 3. Wait for confirmation
      // 4. Update campaign state
      
      // For now, simulate a successful transaction
      const result: TransactionResult = {
        transactionHash,
        status: 'success',
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        gasUsed: '21000',
        effectiveGasPrice: '1000000000',
        nextFrameUrl: `${this.baseUrl}/frames/success/${request.campaignId}?tx=${transactionHash}`
      };

      // Update campaign state (mock)
      await this.updateCampaignAfterMint(request.campaignId, request.quantity);

      console.log('Mint transaction processed successfully:', result);
      return result;

    } catch (error) {
      console.error('Error processing mint transaction:', error);
      
      const errorResult: TransactionResult = {
        transactionHash: '',
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        nextFrameUrl: `${this.baseUrl}/frames/error/${request.campaignId}?error=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`
      };

      return errorResult;
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionHash: string): Promise<TransactionStatus> {
    try {
      // In production, this would query the blockchain for transaction status
      // For now, return mock data
      
      const status: TransactionStatus = {
        hash: transactionHash,
        status: 'confirmed',
        confirmations: Math.floor(Math.random() * 10) + 1,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        gasUsed: '21000',
        gasPrice: '1000000000',
        timestamp: Date.now() - Math.floor(Math.random() * 300000) // Random time within last 5 minutes
      };

      return status;
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }

  /**
   * Validate mint request
   */
  private validateMintRequest(request: MintTransactionRequest): { valid: boolean; error?: string } {
    if (!request.campaignId) {
      return { valid: false, error: 'Campaign ID is required' };
    }

    if (!request.userAddress) {
      return { valid: false, error: 'User address is required' };
    }

    if (!this.isValidAddress(request.userAddress)) {
      return { valid: false, error: 'Invalid user address format' };
    }

    if (!request.quantity || request.quantity < 1) {
      return { valid: false, error: 'Quantity must be at least 1' };
    }

    if (request.quantity > 10) {
      return { valid: false, error: 'Maximum 10 tokens per transaction' };
    }

    return { valid: true };
  }

  /**
   * Check if address is valid Ethereum address
   */
  private isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Get campaign data (mock implementation)
   */
  private async getCampaignData(campaignId: string): Promise<any> {
    // Mock campaign data - in production, this would fetch from database
    return {
      id: campaignId,
      title: 'Amazing NFT Collection',
      creator: 'Creator Name',
      description: 'This is an amazing NFT collection!',
      price: '0.01',
      totalSupply: 1000,
      minted: Math.floor(Math.random() * 200) + 50, // Random minted count
      endTime: Date.now() + 86400 * 30 * 1000, // 30 days from now
      isActive: true,
      contractAddress: '0x1234567890123456789012345678901234567890'
    };
  }

  /**
   * Generate mock transaction hash
   */
  private generateMockTransactionHash(): string {
    return '0x' + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }

  /**
   * Log transaction attempt for analytics
   */
  private async logTransactionAttempt(
    request: MintTransactionRequest, 
    transactionHash: string
  ): Promise<void> {
    try {
      console.log('Transaction attempt logged:', {
        campaignId: request.campaignId,
        userAddress: request.userAddress,
        quantity: request.quantity,
        transactionHash,
        timestamp: new Date().toISOString(),
        referrer: request.referrer
      });
      
      // In production, this would save to analytics database
    } catch (error) {
      console.error('Error logging transaction attempt:', error);
    }
  }

  /**
   * Update campaign state after successful mint
   */
  private async updateCampaignAfterMint(campaignId: string, quantity: number): Promise<void> {
    try {
      console.log('Updating campaign after mint:', {
        campaignId,
        quantity,
        timestamp: new Date().toISOString()
      });
      
      // In production, this would:
      // 1. Update campaign minted count
      // 2. Update supporter count
      // 3. Update creator profile stats
      // 4. Trigger any rewards/achievements
      
    } catch (error) {
      console.error('Error updating campaign after mint:', error);
    }
  }

  /**
   * Estimate gas cost for mint transaction
   */
  async estimateGasCost(request: MintTransactionRequest): Promise<{
    gasLimit: string;
    gasPrice: string;
    totalCost: string;
  }> {
    try {
      // In production, this would estimate actual gas costs
      const baseGas = 50000; // Base gas for mint
      const gasPerToken = 5000; // Additional gas per token
      const gasLimit = baseGas + (gasPerToken * request.quantity);
      
      const gasPrice = '1000000000'; // 1 gwei
      const totalCost = (gasLimit * parseInt(gasPrice)).toString();
      
      return {
        gasLimit: gasLimit.toString(),
        gasPrice,
        totalCost
      };
    } catch (error) {
      console.error('Error estimating gas cost:', error);
      throw error;
    }
  }

  /**
   * Check if user has already minted from this campaign
   */
  async checkUserMintStatus(_userAddress: string, _campaignId: string): Promise<{
    hasMinted: boolean;
    mintCount: number;
    lastMintTime?: number;
  }> {
    try {
      // Mock data - in production, this would check blockchain/database
      const hasMinted = Math.random() > 0.7; // 30% chance user has minted
      const mintCount = hasMinted ? Math.floor(Math.random() * 3) + 1 : 0;
      const lastMintTime: number | undefined = hasMinted ? Date.now() - Math.floor(Math.random() * 86400000) : undefined;
      
      return {
        hasMinted,
        mintCount,
        ...(lastMintTime !== undefined && { lastMintTime })
      };
    } catch (error) {
      console.error('Error checking user mint status:', error);
      throw error;
    }
  }

  /**
   * Get mint transaction receipt
   */
  async getTransactionReceipt(transactionHash: string): Promise<{
    transactionHash: string;
    blockNumber: number;
    gasUsed: string;
    status: boolean;
    logs: any[];
    timestamp: number;
  }> {
    try {
      // Mock receipt - in production, this would fetch from blockchain
      return {
        transactionHash,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        gasUsed: '21000',
        status: true,
        logs: [],
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error getting transaction receipt:', error);
      throw error;
    }
  }

  /**
   * Retry failed transaction
   */
  async retryTransaction(originalTxHash: string, newGasPrice?: string): Promise<TransactionResult> {
    try {
      console.log('Retrying transaction:', { originalTxHash, newGasPrice });
      
      // In production, this would:
      // 1. Check if original transaction is still pending
      // 2. Create new transaction with higher gas price
      // 3. Submit replacement transaction
      
      // Mock retry
      const newTxHash = this.generateMockTransactionHash();
      
      return {
        transactionHash: newTxHash,
        status: 'pending',
        effectiveGasPrice: newGasPrice || '1500000000' // 1.5 gwei
      };
    } catch (error) {
      console.error('Error retrying transaction:', error);
      throw error;
    }
  }
}

export const transactionService = TransactionService.getInstance();
