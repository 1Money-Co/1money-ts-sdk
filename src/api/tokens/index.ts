import { get, post } from '@/client';
import { API_VERSION } from '@/api/constants';

import type { Hash, HashWithToken } from '@/api/types';
import type {
  MintInfo,
  TokenManageListPayload,
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
    return get<'custom', MintInfo>(`${API_PREFIX}/token_metadata?token=${token}`, { withCredentials: false });
  },

  /**
   * Set token manage list status
   * @param payload Token manage list request payload
   * @returns Promise with transaction hash response
   */
  setManageList: (payload: TokenManageListPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/managelist`, payload, { withCredentials: false });
  },

  /**
   * Burn tokens
   * @param payload Token burn request payload
   * @returns Promise with transaction hash response
   */
  burnToken: (payload: TokenBurnPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/burn`, payload, { withCredentials: false });
  },

  /**
   * Grant or revoke token authority
   * @param payload Token authority request payload
   * @returns Promise with transaction hash response
   */
  grantAuthority: (payload: TokenAuthorityPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/grant_authority`, payload, { withCredentials: false });
  },

  /**
   * Issue new token
   * @param payload Token issue request payload
   * @returns Promise with transaction hash and token address response
   */
  issueToken: (payload: TokenIssuePayload) => {
    return post<'custom', HashWithToken>(`${API_PREFIX}/issue`, payload, { withCredentials: false });
  },

  /**
   * Mint tokens
   * @param payload Token mint request payload
   * @returns Promise with transaction hash response
   */
  mintToken: (payload: TokenMintPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/mint`, payload, { withCredentials: false });
  },

  /**
   * Pause or unpause token
   * @param payload Token pause request payload
   * @returns Promise with transaction hash response
   */
  pauseToken: (payload: TokenPausePayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/pause`, payload, { withCredentials: false });
  },

  /**
   * Update token metadata
   * @param payload Token metadata request payload
   * @returns Promise with transaction hash response
   */
  updateMetadata: (payload: TokenMetadataPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/update_metadata`, payload, { withCredentials: false });
  }
};

export default tokensApi;
