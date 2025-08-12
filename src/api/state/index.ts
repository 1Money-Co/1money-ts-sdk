import { get } from '@/client';
import { API_VERSION } from '@/api/constants';

import type { EpochCheckpointResponse } from './types';

const API_PREFIX = `/${API_VERSION}/states`;

/**
 * State API methods
 */
export const stateApi = {
  /**
   * Get latest epoch checkpoint
   * @returns Promise with latest epoch checkpoint response
   */
  getLatestEpochCheckpoint: () => {
    return get<'custom', EpochCheckpointResponse>(`${API_PREFIX}/latest_epoch_checkpoint`, { withCredentials: false });
  }
};

export default stateApi;