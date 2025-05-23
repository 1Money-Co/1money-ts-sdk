import { get } from '@/client';
import { API_VERSION } from '@/api/constants';

import type { ChainIdResponse } from './types';

const API_PREFIX = `/${API_VERSION}/chains`;

/**
 * Checkpoint API methods
 */
export const chainApi = {
  /**
   * Get the current chain id
   * @returns Promise with chain id response
   */
  getChainId: () => {
    return get<'custom', ChainIdResponse>(`${API_PREFIX}/chain_id`, { withCredentials: false });
  },
};

export default chainApi;
