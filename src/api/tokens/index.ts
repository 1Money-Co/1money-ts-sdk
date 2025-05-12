import { get, post } from '@/client';
import type { Hash, HashWithToken } from '@/api/types';
import type {
  MintInfo,
  AuthorityType,
  AuthorityAction,
  BlacklistAction,
  PauseAction,
  KeyValuePair,
  RestSignature
} from './types';

// Request payload interfaces
interface TokenBlacklistPayload {
  chain_id: number;
  nonce: number;
  action: BlacklistAction;
  address: string;
  token: string;
  signature: RestSignature;
}

interface TokenBurnPayload {
  chain_id: number;
  nonce: number;
  recipient: string;
  value: string;
  token: string;
  signature: RestSignature;
}

interface TokenAuthorityPayload {
  chain_id: number;
  nonce: number;
  action: AuthorityAction;
  authority_type: AuthorityType;
  authority_address: string;
  token: string;
  value?: string;
  signature: RestSignature;
}

interface TokenIssuePayload {
  chain_id: number;
  nonce: number;
  symbol: string;
  name: string;
  decimals: number;
  master_authority: string;
  signature: RestSignature;
}

interface TokenMintPayload {
  chain_id: number;
  nonce: number;
  recipient: string;
  value: string;
  token: string;
  signature: RestSignature;
}

interface TokenPausePayload {
  chain_id: number;
  nonce: number;
  action: PauseAction;
  token: string;
  signature: RestSignature;
}

interface TokenMetadataPayload {
  chain_id: number;
  nonce: number;
  name: string;
  uri: string;
  token: string;
  additional_metadata: KeyValuePair[];
  signature: RestSignature;
}

/**
 * Tokens API methods
 */
export const tokensApi = {
  /**
   * Get token metadata
   * @param token Token address to lookup metadata for
   * @returns Promise with token metadata response
   */
  getTokenMetadata: (token: string) => {
    return get<'custom', MintInfo>(`/v1/tokens/token_metadata?token=${token}`);
  },

  /**
   * Set token blacklist status
   * @param payload Token blacklist request payload
   * @returns Promise with transaction hash response
   */
  setBlacklist: (payload: TokenBlacklistPayload) => {
    return post<'custom', Hash>('/v1/tokens/blacklist', payload);
  },

  /**
   * Burn tokens
   * @param payload Token burn request payload
   * @returns Promise with transaction hash response
   */
  burnToken: (payload: TokenBurnPayload) => {
    return post<'custom', Hash>('/v1/tokens/burn', payload);
  },

  /**
   * Grant or revoke token authority
   * @param payload Token authority request payload
   * @returns Promise with transaction hash response
   */
  grantAuthority: (payload: TokenAuthorityPayload) => {
    return post<'custom', Hash>('/v1/tokens/grant_authority', payload);
  },

  /**
   * Issue new token
   * @param payload Token issue request payload
   * @returns Promise with transaction hash and token address response
   */
  issueToken: (payload: TokenIssuePayload) => {
    return post<'custom', HashWithToken>('/v1/tokens/issue', payload);
  },

  /**
   * Mint tokens
   * @param payload Token mint request payload
   * @returns Promise with transaction hash response
   */
  mintToken: (payload: TokenMintPayload) => {
    return post<'custom', Hash>('/v1/tokens/mint', payload);
  },

  /**
   * Pause or unpause token
   * @param payload Token pause request payload
   * @returns Promise with transaction hash response
   */
  pauseToken: (payload: TokenPausePayload) => {
    return post<'custom', Hash>('/v1/tokens/pause', payload);
  },

  /**
   * Update token metadata
   * @param payload Token metadata request payload
   * @returns Promise with transaction hash response
   */
  updateMetadata: (payload: TokenMetadataPayload) => {
    return post<'custom', Hash>('/v1/tokens/update_metadata', payload);
  }
};

export default tokensApi;
