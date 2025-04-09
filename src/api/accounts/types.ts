// Types for accounts API
import { AddressSchema, TokenAddressSchema, U256Schema } from '../types';

// Account info response
export interface AccountInfo {
  nonce: number;
}

// Associated token account response
export interface AssociatedTokenAccount {
  token_account_address: AddressSchema;
  balance: U256Schema;
  nonce: number;
}
