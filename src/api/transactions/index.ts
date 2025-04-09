import { get, post } from '../../utils';
import { Transaction } from '../checkpoints/types';
import {
  TransactionReceipt,
  EstimateFee,
  PaymentPayload,
  CancellationPayload
} from './types';
import { Hash } from '../types';

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
    return get<'custom', Transaction>(`/v1/transactions/by_hash?hash=${hash}`);
  },

  /**
   * Get transaction receipt by hash
   * @param hash Hash of the transaction to lookup receipt for
   * @returns Promise with transaction receipt response
   */
  getReceiptByHash: (hash: string) => {
    return get<'custom', TransactionReceipt>(`/v1/transactions/receipt/by_hash?hash=${hash}`);
  },

  /**
   * Estimate transaction fee
   * @param from Address of the transaction author
   * @param value Value of the transaction
   * @param token Optional token address
   * @returns Promise with fee estimate response
   */
  estimateFee: (from: string, value: string, token?: string) => {
    let url = `/v1/transactions/estimate_fee?from=${from}&value=${value}`;
    if (token) {
      url += `&token=${token}`;
    }
    return get<'custom', EstimateFee>(url);
  },

  /**
   * Submit payment transaction
   * @param payload Payment transaction payload
   * @returns Promise with transaction hash response
   */
  payment: (payload: PaymentPayload) => {
    return post<'custom', Hash>('/v1/transactions/payment', payload);
  },

  /**
   * Cancel transaction
   * @param payload Cancellation payload
   * @returns Promise with transaction hash response
   */
  cancel: (payload: CancellationPayload) => {
    return post<'custom', Hash>('/v1/transactions/cancellation', payload);
  }
};

export default transactionsApi;
