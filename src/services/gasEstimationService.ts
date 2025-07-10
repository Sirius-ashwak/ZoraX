import { createPublicClient, http, parseEther, formatEther } from 'viem';
import { optimism } from 'viem/chains';

export interface GasEstimation {
  gasLimit: bigint;
  gasPrice: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  totalCostWei: bigint;
  totalCostETH: string;
  totalCostUSD?: string;
}

export interface GasOptions {
  speed: 'slow' | 'standard' | 'fast';
}

class GasEstimationService {
  private publicClient;
  private ethPriceUSD: number | null = null;
  private lastEthPriceFetch: number = 0;

  constructor() {
    this.publicClient = createPublicClient({
      chain: optimism,
      transport: http((typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPTIMISM_RPC_URL) || 'https://mainnet.optimism.io'),
    });
  }

  /**
   * Get current ETH price in USD
   */
  private async getETHPriceUSD(): Promise<number> {
    const now = Date.now();
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    // Return cached price if still valid
    if (this.ethPriceUSD && (now - this.lastEthPriceFetch) < CACHE_DURATION) {
      return this.ethPriceUSD;
    }

    try {
      // Using CoinGecko API for ETH price
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch ETH price');
      }

      const data = await response.json();
      this.ethPriceUSD = data.ethereum.usd;
      this.lastEthPriceFetch = now;
      
      return this.ethPriceUSD || 0;
    } catch (error) {
      console.warn('Failed to fetch ETH price, using cached value or null:', error);
      return this.ethPriceUSD || 0;
    }
  }

  /**
   * Get current gas prices from the network
   */
  async getCurrentGasPrices(): Promise<{
    slow: bigint;
    standard: bigint;
    fast: bigint;
  }> {
    try {
      const gasPrice = await this.publicClient.getGasPrice();
      
      // For Optimism, gas prices are more stable, so we create tiers
      const slow = gasPrice;
      const standard = gasPrice + (gasPrice / BigInt(10)); // +10%
      const fast = gasPrice + (gasPrice / BigInt(5)); // +20%

      return { slow, standard, fast };
    } catch (error) {
      console.error('Failed to get gas prices:', error);
      // Fallback gas prices for Optimism (in gwei)
      return {
        slow: parseEther('0.001'), // 1 gwei
        standard: parseEther('0.0015'), // 1.5 gwei
        fast: parseEther('0.002'), // 2 gwei
      };
    }
  }

  /**
   * Estimate gas for contract deployment
   */
  async estimateContractDeployment(
    contractBytecode: string,
    _constructorArgs: any[] = [],
    options: GasOptions = { speed: 'standard' }
  ): Promise<GasEstimation> {
    try {
      // Estimate gas limit for contract deployment
      const gasLimit = await this.publicClient.estimateGas({
        data: contractBytecode as `0x${string}`,
        value: BigInt(0),
      });

      // Get gas prices
      const gasPrices = await this.getCurrentGasPrices();
      const gasPrice = gasPrices[options.speed];

      // For EIP-1559 transactions
      const maxFeePerGas = gasPrice;
      const maxPriorityFeePerGas = gasPrice / BigInt(10); // 10% of max fee

      // Calculate total cost
      const totalCostWei = gasLimit * maxFeePerGas;
      const totalCostETH = formatEther(totalCostWei);

      // Get USD price
      const ethPriceUSD = await this.getETHPriceUSD();
      const totalCostUSD = ethPriceUSD ? 
        (parseFloat(totalCostETH) * ethPriceUSD).toFixed(2) : 
        undefined;

      return {
        gasLimit,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        totalCostWei,
        totalCostETH,
        totalCostUSD,
      };
    } catch (error) {
      console.error('Failed to estimate gas for contract deployment:', error);
      throw new Error(`Gas estimation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Estimate gas for a standard transaction
   */
  async estimateTransaction(
    to: string,
    data: string,
    value: bigint = BigInt(0),
    options: GasOptions = { speed: 'standard' }
  ): Promise<GasEstimation> {
    try {
      const gasLimit = await this.publicClient.estimateGas({
        to: to as `0x${string}`,
        data: data as `0x${string}`,
        value,
      });

      const gasPrices = await this.getCurrentGasPrices();
      const gasPrice = gasPrices[options.speed];

      const maxFeePerGas = gasPrice;
      const maxPriorityFeePerGas = gasPrice / BigInt(10);

      const totalCostWei = gasLimit * maxFeePerGas;
      const totalCostETH = formatEther(totalCostWei);

      const ethPriceUSD = await this.getETHPriceUSD();
      const totalCostUSD = ethPriceUSD ? 
        (parseFloat(totalCostETH) * ethPriceUSD).toFixed(2) : 
        undefined;

      return {
        gasLimit,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        totalCostWei,
        totalCostETH,
        totalCostUSD,
      };
    } catch (error) {
      console.error('Failed to estimate gas for transaction:', error);
      throw new Error(`Gas estimation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get estimated deployment cost in a user-friendly format
   */
  formatGasEstimation(estimation: GasEstimation): {
    gasLimit: string;
    gasPrice: string;
    totalCostETH: string;
    totalCostUSD: string;
  } {
    return {
      gasLimit: estimation.gasLimit.toString(),
      gasPrice: `${formatEther(estimation.gasPrice)} ETH`,
      totalCostETH: `${estimation.totalCostETH} ETH`,
      totalCostUSD: estimation.totalCostUSD ? `$${estimation.totalCostUSD}` : 'N/A',
    };
  }

  /**
   * Compare costs across different gas speeds
   */
  async compareGasSpeeds(
    to: string,
    data: string,
    value: bigint = BigInt(0)
  ): Promise<{
    slow: GasEstimation;
    standard: GasEstimation;
    fast: GasEstimation;
  }> {
    const [slow, standard, fast] = await Promise.all([
      this.estimateTransaction(to, data, value, { speed: 'slow' }),
      this.estimateTransaction(to, data, value, { speed: 'standard' }),
      this.estimateTransaction(to, data, value, { speed: 'fast' }),
    ]);

    return { slow, standard, fast };
  }
}

// Export singleton instance
export const gasEstimationService = new GasEstimationService();
