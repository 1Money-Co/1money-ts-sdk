import { get } from '@/utils';
import type { AccountInfo, AssociatedTokenAccount } from './types';

/**
 * Accounts API methods
 */
export const accountsApi = {
  /**
   * Get account nonce
   * @param address Address of the account to lookup nonce for
   * @returns Promise with account info response
   */
  getNonce: (address: string) => {
    return get<'custom', AccountInfo>(`/v1/accounts/nonce?address=${address}`);
  },

  /**
   * Get associated token account
   * @param address Address of the account to lookup associated token account for
   * @param token Token address to lookup associated token account for
   * @returns Promise with associated token account response
   */
  getTokenAccount: (address: string, token: string) => {
    return get<'custom', AssociatedTokenAccount>(`/v1/accounts/token_account?address=${address}&token=${token}`);
  }
};

export default accountsApi;
