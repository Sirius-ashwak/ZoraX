import { getCurrentBlock, getNetworkName, getCurrentChainId } from '../utils/blockchain';

export const testBlockchainConnection = async (): Promise<void> => {
  try {
    console.log('🔗 Testing blockchain connection...');
    
    const chainId = getCurrentChainId();
    const networkName = getNetworkName(chainId);
    console.log(`📡 Connected to: ${networkName} (Chain ID: ${chainId})`);
    
    const blockNumber = await getCurrentBlock();
    console.log(`📦 Current block number: ${blockNumber}`);
    
    console.log('✅ Blockchain connection test successful!');
  } catch (error) {
    console.error('❌ Blockchain connection test failed:', error);
  }
};

// Auto-run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testBlockchainConnection();
}
