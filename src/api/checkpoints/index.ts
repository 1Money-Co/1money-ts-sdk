import { get } from '@/client';
import { API_VERSION } from '@/api/constants';

import type { CheckpointNumberResponse, Checkpoint } from './types';

const API_PREFIX = `/${API_VERSION}/checkpoints`;

/**
 * Checkpoint API methods
 */
export const checkpointsApi = {
  /**
   * Get the current checkpoint number
   * @returns Promise with checkpoint number response
   */
  getNumber: () => {
    return get<'custom', CheckpointNumberResponse>(`${API_PREFIX}/number`, { withCredentials: false });
  },

  /**
   * Get checkpoint by hash
   * @param hash Hash of the checkpoint to lookup
   * @param full Whether to include full transaction details
   * @returns Promise with checkpoint response
   */
  getByHash: (hash: string, full = false) => {
    return get<'custom', Checkpoint>(`${API_PREFIX}/by_hash?hash=${hash}&full=${full}`, { withCredentials: false });
  },

  /**
   * Get checkpoint by number
   * @param number Number of the checkpoint to lookup
   * @param full Whether to include full transaction details
   * @returns Promise with checkpoint response
   */
  getByNumber: (number: number | string, full = false) => {
    return get<'custom', Checkpoint>(`${API_PREFIX}/by_number?number=${number}&full=${full}`, { withCredentials: false });
  }
};

export default checkpointsApi;
