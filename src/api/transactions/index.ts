import { get, post } from '@/client';
import { API_VERSION } from '@/api/constants';

import type { Hash } from '@/api/types';
import type { Transaction } from '@/api/checkpoints/types';
import type {
  TransactionReceipt,
  EstimateFee,
  PaymentPayload
} from './types';

const API_PREFIX = `/${API_VERSION}/transactions`;

/**
 * Transactions API methods
 */
export const transactionsApi = {
  /**
   * Get transaction by hash
   * @param hash Hash of the transaction to lookup
   * @returns Promise with transaction response
   */
  getByHash: (hash: string) => {
    return get<'custom', Transaction>(`${API_PREFIX}/by_hash?hash=${hash}`, { withCredentials: false });
  },

  /**
   * Get transaction receipt by hash
   * @param hash Hash of the transaction to lookup receipt for
   * @returns Promise with transaction receipt response
   */
  getReceiptByHash: (hash: string) => {
    return get<'custom', TransactionReceipt>(`${API_PREFIX}/receipt/by_hash?hash=${hash}`, { withCredentials: false });
  },

  /**
   * Estimate transaction fee
   * @param from Address of the transaction author
   * @param value Value of the transaction
   * @param token Optional token address
   * @returns Promise with fee estimate response
   */
  estimateFee: (from: string, value: string, token?: string) => {
    let url = `${API_PREFIX}/estimate_fee?from=${from}&value=${value}`;
    if (token) {
      url += `&token=${token}`;
    }
    return get<'custom', EstimateFee>(url, { withCredentials: false });
  },

  /**
   * Submit payment transaction
   * @param payload Payment transaction payload
   * @returns Promise with transaction hash response
   */
  payment: (payload: PaymentPayload) => {
    return post<'custom', Hash>(`${API_PREFIX}/payment`, payload, { withCredentials: false });
  }
};

export default transactionsApi;
