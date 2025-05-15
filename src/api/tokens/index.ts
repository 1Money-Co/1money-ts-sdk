import { get, post } from '@/client';
import { API_VERSION } from '@/api/constants';

import type { Hash, HashWithToken } from '@/api/types';
import type {
  MintInfo,
  TokenBlacklistPayload,
  TokenBurnPayload,
  TokenAuthorityPayload,
  TokenIssuePayload,
  TokenMintPayload,
  TokenPausePayload,
  TokenMetadataPayload,
} from './types';

const API_PREFIX = `/${API_VERSION}/tokens`;

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
    return get<'custom', MintInfo>(`${API_PREFIX}/token_metadata?token=${token}`);
  },

  /**
   * Set token blacklist status
   * @param payload Token blacklist request payload
   * @returns Promise with transaction hash response
   */
  setBlacklist: (payload: TokenBlacklistPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/blacklist`, payload);
  },

  /**
   * Burn tokens
   * @param payload Token burn request payload
   * @returns Promise with transaction hash response
   */
  burnToken: (payload: TokenBurnPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/burn`, payload);
  },

  /**
   * Grant or revoke token authority
   * @param payload Token authority request payload
   * @returns Promise with transaction hash response
   */
  grantAuthority: (payload: TokenAuthorityPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/grant_authority`, payload);
  },

  /**
   * Issue new token
   * @param payload Token issue request payload
   * @returns Promise with transaction hash and token address response
   */
  issueToken: (payload: TokenIssuePayload) => {
    return post<'custom', HashWithToken>(`${API_PREFIX}/issue`, payload);
  },

  /**
   * Mint tokens
   * @param payload Token mint request payload
   * @returns Promise with transaction hash response
   */
  mintToken: (payload: TokenMintPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/mint`, payload);
  },

  /**
   * Pause or unpause token
   * @param payload Token pause request payload
   * @returns Promise with transaction hash response
   */
  pauseToken: (payload: TokenPausePayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/pause`, payload);
  },

  /**
   * Update token metadata
   * @param payload Token metadata request payload
   * @returns Promise with transaction hash response
   */
  updateMetadata: (payload: TokenMetadataPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/update_metadata`, payload);
  }
};

export default tokensApi;
