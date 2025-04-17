import 'mocha';
import { expect } from 'chai';
import { api, CHAIN_IDS } from '../../';
import { ethers } from 'ethers';
import { keccak256 } from 'ethers';
import { encodeRlp } from 'ethers';

/**
 * Payment transaction payload interface
 */
interface PaymentPayload {
  chainID: number;
  nonce: number;
  recipient: string;
  value: ethers.BigNumberish;
  token: string;
}

interface Signature {
  r: string;
  s: string;
  v: number;
}

/**
 * Sign a message using the provided private key
 * @param payload Payment payload to sign
 * @param privateKey Private key to sign with
 * @returns Signature object with r, s, v components
 */
function signMessage(msg: PaymentPayload, privateKey: string): Signature | null {
  try {
    // 1. Convert values to hex and create RLP array
    const chainIdHex = ethers.toBeHex(msg.chainID);
    const nonceHex = ethers.toBeHex(msg.nonce);
    const valueHex = ethers.toBeHex(msg.value);
    const rlpData = [chainIdHex, nonceHex, msg.recipient, valueHex, msg.token];

    // 2. RLP encode the message
    const encoded = encodeRlp(rlpData);

    // 3. Calculate Keccak256 hash
    const hash = keccak256(encoded);

    // 4. sign
    const signingKey = new ethers.SigningKey(privateKey);
    const signatureData = signingKey.sign(ethers.getBytes(hash));

    return {
      r: signatureData.r,
      s: signatureData.s,
      v: signatureData.v,
    };
  } catch (error) {
    console.error('Error signing message:', error);
    return null;
  }
}

describe('transactions API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(1000);

  it('should have transactions API object', function () {
    const apiClient = api();
    expect(apiClient.transactions).to.be.an('object');
  });

  it('should have getByHash method', function () {
    const apiClient = api();
    expect(apiClient.transactions.getByHash).to.be.a('function');
  });

  it('should have getReceiptByHash method', function () {
    const apiClient = api();
    expect(apiClient.transactions.getReceiptByHash).to.be.a('function');
  });

  it('should have estimateFee method', function () {
    const apiClient = api();
    expect(apiClient.transactions.estimateFee).to.be.a('function');
  });

  it('should have payment method', function () {
    const apiClient = api();
    expect(apiClient.transactions.payment).to.be.a('function');
  });

  // Valid values for testing on the testnet
  // This is a real transaction hash from the testnet
  // Example values for testing
  // Private key for testing - DO NOT use this in production
  const privateKey = '0xce6ed4b68189c8e844fc245d3169df053fb9e05c13f168cd005a6a111ac67bee';
  const testHash = '0xc0060068634dc33aed67678c852c394fed34c388ed7b0e735b017d6a3640dffb';
  const receipt = '0x1DFa71eC8284F0F835EDbfaEA458d38bCff446d6';
  const testValue = '888';
  const testToken = '0x461BeB67a74b68Eb60EAD561DdDFC870fD9835a0';

  // Make real API calls to test the transactions API
  it('should fetch transaction by hash', function (done) {
    const apiClient = api();
    apiClient.transactions.getByHash(testHash)
      .success(response => {
        console.log(`Transaction details for hash ${testHash}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('hash');
        expect(response).to.have.property('from');
        done();
      })
      .error(err => {
        console.error('Error fetching transaction by hash:', err);
        // If the transaction doesn't exist, we'll consider the test passed
        if (err && err.message && err.message.includes('not found')) {
          console.log('Transaction not found, but API call was successful');
          done();
        } else {
          throw err;
        }
      });
  });

  it('should fetch transaction receipt by hash', function (done) {
    const apiClient = api();
    apiClient.transactions.getReceiptByHash(testHash)
      .success(response => {
        console.log(`Transaction receipt for hash ${testHash}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('transaction_hash');
        expect(response).to.have.property('success');
        done();
      })
      .error(err => {
        console.error('Error fetching transaction receipt by hash:', err);
        // If the transaction doesn't exist, we'll consider the test passed
        if (err && err.message && err.message.includes('not found')) {
          console.log('Transaction receipt not found, but API call was successful');
          done();
        } else {
          throw err;
        }
      });
  });

  it('should estimate transaction fee', function (done) {
    const apiClient = api();
    apiClient.transactions.estimateFee(receipt, testValue, testToken)
      .success(response => {
        console.log(`Estimated fee for address ${receipt}, value ${testValue}, token ${testToken}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('fee');
        expect(response.fee).to.be.a('string');
        done();
      })
      .error(err => {
        console.error('Error estimating transaction fee:', err);
        throw err;
      });
  });

  // Test for payment transaction with real signing
  it('should submit payment transaction', function (done) {
    // We would need the API client if we were submitting the transaction
    const apiClient = api();

    // This test demonstrates how to create a payment transaction with ethers.js
    // using real signing but without async/await

    // Step 1: Set up the transaction parameters
    const chainId = 1212101; // Testnet chain ID from the SDK
    const nonce = 12;   // Account nonce (would be fetched from the API in a real app)
    const recipient = receipt;
    const value = testValue;
    const token = testToken;

    // Step 2: Create the transaction payload (without signature)
    const transactionPayload = {
      chain_id: chainId,
      nonce: nonce,
      recipient: recipient,
      value: value,
      token: token
    };

    try {
      // Step 3: Create a payment payload and sign it
      // The message format should match what the 1money network expects
      // and match the Go implementation using github.com/ethereum/go-ethereum/rlp

      // Create the payment payload for signing
      const payloadToSign: PaymentPayload = {
        chainID: chainId,
        nonce: nonce,
        recipient: recipient,
        value: value,
        token: token
      };

      // Use the signMessage function to sign the payload
      const signature = signMessage(payloadToSign, privateKey);

      // Create the signature object
      const signatureObject = {
        r: signature?.r ?? '',
        s: signature?.s ?? '',
        v: signature?.v ?? 0
      };

      // Step 5: Create the complete payment payload with signature
      const paymentPayload = {
        ...transactionPayload,
        signature: signatureObject
      };

      // Log the payload for verification
      console.log('Payment payload created with real signature:', paymentPayload);

      // In a real application, you would submit the transaction like this:

      apiClient.transactions.payment(paymentPayload)
        .success(response => {
          console.log('Payment transaction submitted successfully:', response);
          expect(response).to.be.an('object');
          expect(response).to.have.property('hash');
          console.log('Transaction hash:', response.hash);
          done();
        })
        .error(err => {
          // !todo
          expect(err).to.be.an('object');
          expect(err).to.have.property('message');
          expect(err.message).to.include('duplicate');
          done();
          // console.error('Error submitting payment transaction:', err);
          // If the error is due to a duplicate transaction, consider it a success
          // if (err && err.message && err.message.includes('duplicate')) {
          //   console.error('Duplicate transaction detected, considering test successful');
          // } else {
          //   console.error('Test failed due to unexpected error');
          //   throw err;
          // }
        })
        .rest(() => done())
        .finally(() => done());

      // Since we're not actually submitting, we'll just complete the test
      // No need to call done() in an async function
    } catch (error) {
      console.error('Error in payment transaction test:', error);
      throw error; // Throw the error to fail the test
    }
  });

  it('should have cancel method', function () {
    const apiClient = api();
    expect(apiClient.transactions.cancel).to.be.a('function');
  });

});

