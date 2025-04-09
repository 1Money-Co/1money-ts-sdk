// Types for tokens API
import { AddressSchema, TokenAddressSchema, U256Schema } from '../types';

// Token metadata key-value pair
export interface MetaDataKeyValuePair {
  key: string;
  value: string;
}

// Token metadata
export interface TokenMetadata {
  name: string;
  uri: string;
  additional_metadata: MetaDataKeyValuePair[];
}

// Minter allowance
export interface MinterAllowance {
  minter: AddressSchema;
  allowance: U256Schema;
}

// Mint info (token metadata)
export interface MintInfo {
  symbol: string;
  master_authority: AddressSchema;
  master_mint_authority: AddressSchema;
  minter_authorities: MinterAllowance[];
  pause_authority: AddressSchema;
  burn_authorities: AddressSchema[];
  black_list_authorities: AddressSchema[];
  black_list: AddressSchema[];
  metadata_update_authority: AddressSchema;
  supply: U256Schema;
  decimals: number;
  is_paused: boolean;
  meta: TokenMetadata;
}

// Request types
export interface KeyValuePair {
  key: string;
  value: string;
}

// Authority types
export enum AuthorityType {
  MasterMint = 'MasterMint',
  MintTokens = 'MintTokens',
  Pause = 'Pause',
  Burn = 'Burn',
  Blacklist = 'Blacklist',
  UpdateMetadata = 'UpdateMetadata'
}

export enum AuthorityAction {
  Grant = 'Grant',
  Revoke = 'Revoke'
}

export enum BlacklistAction {
  Blacklist = 'Blacklist',
  Whitelist = 'Whitelist'
}

export enum PauseAction {
  Pause = 'Pause',
  Unpause = 'Unpause'
}

// Signature type for REST requests
export interface RestSignature {
  r: string;
  s: string;
  v: number;
}
