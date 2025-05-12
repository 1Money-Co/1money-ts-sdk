import { setInitConfig } from '@/client';

// Import API modules
import accountsApi from './accounts';
import tokensApi from './tokens';
import transactionsApi from './transactions';
import checkpointsApi from './checkpoints';

// Re-export types from each module
export * from './accounts/types';
export * from './tokens/types';
export * from './transactions/types';
export * from './checkpoints/types';

// Base URLs for the API
export const TESTNET_API_URL = 'https://api.testnet.1money.network';
export const MAINNET_API_URL = 'https://api.1money.network';
export const LOCAL_API_URL = 'http://localhost:18555';

// Chain IDs for different networks
export const CHAIN_IDS = {
  MAINNET: 21210,
  TESTNET: 1212101,
  LOCAL: 1212101 // Using same chain ID as testnet for local development
} as const;

/**
 * API client for 1money network
 * @param options Configuration options
 * @param options.network Network to use (testnet, mainnet, local)
 * @param options.timeout Request timeout in milliseconds
 * @param options.chainId Custom chain ID (overrides the default for the selected network)
 */
export function api(options?: {
  network?: 'testnet' | 'mainnet' | 'local';
  timeout?: number;
  chainId?: number;
}): {
  accounts: typeof accountsApi;
  tokens: typeof tokensApi;
  transactions: typeof transactionsApi;
  checkpoints: typeof checkpointsApi;
  chainId: number;
} {
  const network = options?.network || 'mainnet';
  let baseURL = MAINNET_API_URL;

  // Set the base URL based on the network
  switch (network) {
    case 'mainnet':
      baseURL = MAINNET_API_URL;
      break;
    case 'testnet':
      baseURL = TESTNET_API_URL;
      break;
    case 'local':
      baseURL = LOCAL_API_URL;
      break;
  }

  // Determine the chain ID based on the network or use the provided custom chain ID
  const chainId = options?.chainId || (
    network === 'mainnet' ? CHAIN_IDS.MAINNET :
    network === 'local' ? CHAIN_IDS.LOCAL :
    CHAIN_IDS.TESTNET
  );

  // Initialize API configuration
  setInitConfig({
    baseURL,
    // The API returns direct JSON without a wrapper structure
    isSuccess: (_res, status) => status === 200,
    timeout: options?.timeout || 10000
  });

  return {
    /**
     * Accounts API methods
     */
    accounts: accountsApi,

    /**
     * Tokens API methods
     */
    tokens: tokensApi,

    /**
     * Transactions API methods
     */
    transactions: transactionsApi,

    /**
     * Checkpoint API methods
     */
    checkpoints: checkpointsApi,

    /**
     * Chain ID for the selected network
     */
    chainId
  };
}

export default api;
