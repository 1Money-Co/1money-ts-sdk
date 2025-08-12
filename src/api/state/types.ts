// Types for state API
import type { B256Schema } from '../types';

// Latest epoch checkpoint response
export interface EpochCheckpointResponse {
  epoch: number;
  checkpoint: number;
  checkpoint_hash: B256Schema;
  checkpoint_parent_hash: B256Schema;
}