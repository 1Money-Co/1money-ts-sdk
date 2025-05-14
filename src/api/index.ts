import { setInitConfig } from '@/client';

// Import API modules
import accountsApi from './accounts';
import checkpointsApi from './checkpoints';
import tokensApi from './tokens';
import transactionsApi from './transactions';

import { CHAIN_IDS, MAINNET_API_URL, TESTNET_API_URL, LOCAL_API_URL } from './constants';

// Re-export types from each module
export * from './accounts/types';
export * from './tokens/types';
export * from './transactions/types';
export * from './checkpoints/types';

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
  checkpoints: typeof checkpointsApi;
  tokens: typeof tokensApi;
  transactions: typeof transactionsApi;
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
    // Treat status code 200 as success
    isSuccess: (_res, status) => status === 200,
    timeout: options?.timeout || 10000
  });

  return {
    /**
     * Accounts API methods
     */
    accounts: accountsApi,

    /**
     * Checkpoint API methods
     */
    checkpoints: checkpointsApi,

    /**
     * Tokens API methods
     */
    tokens: tokensApi,

    /**
     * Transactions API methods
     */
    transactions: transactionsApi,

    /**
     * Chain ID for the selected network
     */
    chainId
  };
}

export default api;
