// Types for tokens API
import { AddressSchema, TokenAddressSchema, U256Schema } from '../types';

import type { Signature } from '@/utils';

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
  master_mint_burn_authority: AddressSchema;
  mint_burn_authorities: MinterAllowance[];
  pause_authorities: AddressSchema[];
  list_authorities: AddressSchema[];
  black_list: AddressSchema[];
  white_list: AddressSchema[];
  metadata_update_authorities: AddressSchema[];
  supply: U256Schema;
  decimals: number;
  is_paused: boolean;
  is_private: boolean;
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
  MintBurnTokens = 'MintBurnTokens',
  Pause = 'Pause',
  ManageList = 'ManageList',
  UpdateMetadata = 'UpdateMetadata'
}

export enum AuthorityAction {
  Grant = 'Grant',
  Revoke = 'Revoke'
}

export enum ManageListAction {
  Blacklist = 'Blacklist',
  Whitelist = 'Whitelist'
}

export enum PauseAction {
  Pause = 'Pause',
  Unpause = 'Unpause'
}

// Signature type for REST requests
export interface RestSignature extends Signature {}

export interface TokenManageListPayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  action: ManageListAction;
  address: string;
  token: string;
  signature: RestSignature;
}

export interface TokenBurnPayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  recipient: string;
  value: string;
  token: string;
  signature: RestSignature;
}

export interface TokenAuthorityPayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  action: AuthorityAction;
  authority_type: AuthorityType;
  authority_address: string;
  token: string;
  value?: string;
  signature: RestSignature;
}

export interface TokenIssuePayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  symbol: string;
  name: string;
  decimals: number;
  master_authority: string;
  is_private: boolean;
  signature: RestSignature;
}

export interface TokenMintPayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  recipient: string;
  value: string;
  token: string;
  signature: RestSignature;
}

export interface TokenPausePayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  action: PauseAction;
  token: string;
  signature: RestSignature;
}

export interface TokenMetadataPayload {
  recent_epoch: number;
  recent_checkpoint: number;
  chain_id: number;
  nonce: number;
  name: string;
  uri: string;
  token: string;
  additional_metadata: KeyValuePair[];
  signature: RestSignature;
}