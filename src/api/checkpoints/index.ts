import { get } from '@/utils';
import type { CheckpointNumberResponse, Checkpoint } from './types';

/**
 * Checkpoint API methods
 */
export const checkpointsApi = {
  /**
   * Get the current checkpoint number
   * @returns Promise with checkpoint number response
   */
  getNumber: () => {
    return get<'custom', CheckpointNumberResponse>('/v1/checkpoints/number');
  },

  /**
   * Get checkpoint by hash
   * @param hash Hash of the checkpoint to lookup
   * @param full Whether to include full transaction details
   * @returns Promise with checkpoint response
   */
  getByHash: (hash: string, full = false) => {
    return get<'custom', Checkpoint>(`/v1/checkpoints/by_hash?hash=${hash}&full=${full}`);
  },

  /**
   * Get checkpoint by number
   * @param number Number of the checkpoint to lookup
   * @param full Whether to include full transaction details
   * @returns Promise with checkpoint response
   */
  getByNumber: (number: number | string, full = false) => {
    return get<'custom', Checkpoint>(`/v1/checkpoints/by_number?number=${number}&full=${full}`);
  }
};

export default checkpointsApi;
