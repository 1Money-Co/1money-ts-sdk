// Types for checkpoint API
import { B256Schema, AddressSchema } from '../types';

// Response type for checkpoint number endpoint
export interface CheckpointNumberResponse {
  number: number;
}

// Transaction type for checkpoint responses
export interface Transaction {
  hash: B256Schema;
  chain_id: number;
  from: AddressSchema;
  nonce: number;
  fee: number;
  signature: {
    r: string;
    s: string;
    v: number;
  };
  checkpoint_hash?: B256Schema;
  checkpoint_number?: number;
  transaction_index?: number;
  // Additional transaction payload fields would be here
}

// Header type for checkpoint responses
export interface Header {
  hash: B256Schema;
  parent_hash: B256Schema;
  state_root: B256Schema;
  transactions_root: B256Schema;
  receipts_root: B256Schema;
  number: number;
  timestamp: number;
  extra_data: string;
}

// Checkpoint response type
export interface Checkpoint extends Header {
  size?: number;
  transactions: Transaction[] | B256Schema[];
}
