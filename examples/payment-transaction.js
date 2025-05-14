// Example of creating and submitting a payment transaction
// Note: This example requires a private key to sign the transaction

import { api, CHAIN_IDS } from '../src/api';
import { ethers } from 'ethers';

/**
 * Payment transaction payload interface
 * @typedef {Object} PaymentPayload
 * @property {number} chainID - Chain ID
 * @property {number} nonce - Account nonce
 * @property {string} recipient - Recipient address
 * @property {ethers.BigNumberish} value - Transaction value
 * @property {string} token - Token address
 * @property {Object} [signature] - Optional signature object
 * @property {string} [signature.r] - Signature r component
 * @property {string} [signature.s] - Signature s component
 * @property {number} [signature.v] - Signature v component
 */

/**
 * Sign a message using the provided private key
 * @param {PaymentPayload} payload - Payment payload to sign
 * @param {string} privateKey - Private key to sign with
 * @returns {Promise<object>} - Signature object with r, s, v components
 */
async function signMessage(payload, privateKey) {
  // Ensure private key has 0x prefix
  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  // Convert values to appropriate formats for RLP encoding
  const chainIdHex = ethers.toBeHex(payload.chainID);
  const nonceHex = ethers.toBeHex(payload.nonce);
  const valueHex = ethers.toBeHex(payload.value);

  // Create an array of values to encode with RLP
  const rlpData = [chainIdHex, nonceHex, payload.recipient, valueHex, payload.token];

  // RLP encode the message
  const encoded = ethers.encodeRlp(rlpData);
  console.log('encoded:', encoded);

  // Calculate Keccak256 hash
  const hash = ethers.keccak256(encoded);
  console.log('Signature Hash:', hash);

  // Create signing key
  const signingKey = new ethers.SigningKey(privateKey);

  // Sign the message
  const signatureObj = signingKey.sign(ethers.getBytes(hash));
  const signature = ethers.concat([
    ethers.getBytes(signatureObj.r),
    ethers.getBytes(signatureObj.s),
    new Uint8Array([signatureObj.v === 28 ? 1 : 0])
  ]);

  console.log('Signature:', ethers.hexlify(signature));

  // Return signature result
  return {
    r: signatureObj.r,
    s: signatureObj.s,
    v: signatureObj.v
  };
}

// Initialize the API client
const apiClient = api();

// Example values - replace with real values for actual use
const privateKey = '0x0000000000000000000000000000000000000000000000000000000000000000'; // Replace with a real private key
const recipientAddress = '0xA634dfba8c7550550817898bC4820cD10888Aac5';
const tokenAddress = '0x91f66cb6c9b56c7e3bcdb9eff9da13da171e89f4';
const value = '1000000000'; // 1 token with 9 decimals
const chainId = CHAIN_IDS.TESTNET; // Using the testnet chain ID from the SDK

/**
 * Create and sign a payment transaction
 * @param {string} privateKey - Private key to sign the transaction
 * @param {string} recipient - Recipient address
 * @param {string} token - Token address
 * @param {string} value - Amount to send
 * @param {number} chainId - Chain ID
 * @returns {Promise<object>} - Signed transaction payload
 */
async function createPaymentTransaction(privateKey, recipient, token, value, chainId) {
  // Step 1: Create a wallet from the private key
  const wallet = new ethers.Wallet(privateKey);
  const senderAddress = wallet.address;
  console.log(`Sender address: ${senderAddress}`);

  // Step 2: Get the current nonce for the sender
  let nonce;
  try {
    const nonceResponse = await new Promise((resolve, reject) => {
      apiClient.accounts.getNonce(senderAddress)
        .success(response => resolve(response))
        .error(err => reject(err));
    });
    nonce = nonceResponse.nonce;
    console.log(`Current nonce for ${senderAddress}: ${nonce}`);
  } catch (error) {
    console.error('Error fetching nonce:', error);
    throw error;
  }

  // Step 3: Create the transaction payload (without signature)
  const transactionPayload = {
    chain_id: chainId,
    nonce: nonce,
    recipient: recipient,
    value: value,
    token: token
  };

  // Step 4: Create a message to sign according to 1money network's requirements
  // The exact format may vary, so consult the 1money network documentation

  // Method 1: Using EIP-712 typed data (recommended for better security)
  // This is a simplified example - the actual domain and types should match 1money's requirements
  const domain = {
    name: '1Money Network',
    version: '1',
    chainId: chainId,
    verifyingContract: '0x0000000000000000000000000000000000000000' // Replace with actual contract address
  };

  const types = {
    Payment: [
      { name: 'chainId', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'recipient', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'token', type: 'address' }
    ]
  };

  const data = {
    chainId: chainId,
    nonce: nonce,
    recipient: recipient,
    value: ethers.parseUnits(value, 0), // Convert string to bigint
    token: token
  };

  // Sign the transaction
  // Note: In a real implementation, you would use the actual signing method required by 1money
  // This is just an example of how to use ethers.js for signing
  try {
    // Method 1: EIP-712 signing (if supported by 1money)
    // This is just for demonstration - we'll use the RLP method below
    const eip712Signature = await wallet.signTypedData(domain, types, data);
    console.log('EIP-712 signature:', eip712Signature);

    // Method 2: Using RLP encoding (matching the Go implementation)
    // Create the payment payload for signing
    const payloadToSign = {
      chainID: chainId,
      nonce: nonce,
      recipient: recipient,
      value: ethers.parseUnits(value, 0), // Convert string to BigNumber
      token: token
    };

    // Use the signMessage function to sign the payload
    const signature = await signMessage(payloadToSign, privateKey);

    // Get the signature components
    const sig = signature;
    console.log('Signature components:', {
      r: sig.r,
      s: sig.s,
      v: sig.v
    });

    // Create the final payload with signature
    const paymentPayload = {
      ...transactionPayload,
      signature: {
        r: sig.r,
        s: sig.s,
        v: sig.v
      }
    };

    return paymentPayload;
  } catch (error) {
    console.error('Error signing transaction:', error);
    throw error;
  }
}

/**
 * Submit a payment transaction
 * @param {object} paymentPayload - Signed payment payload
 * @returns {Promise<object>} - Transaction response
 */
async function submitPaymentTransaction(paymentPayload) {
  return new Promise((resolve, reject) => {
    apiClient.transactions.payment(paymentPayload)
      .success(response => {
        console.log('Payment transaction submitted successfully');
        console.log('Transaction hash:', response.hash);
        resolve(response);
      })
      .error(err => {
        console.error('Error submitting payment transaction:', err);
        reject(err);
      });
  });
}

/**
 * Verify transaction status
 * @param {string} txHash - Transaction hash to verify
 * @returns {Promise<object>} - Transaction receipt
 */
async function verifyTransaction(txHash) {
  return new Promise((resolve, reject) => {
    apiClient.transactions.getReceiptByHash(txHash)
      .success(response => {
        console.log('Transaction receipt:', response);
        resolve(response);
      })
      .error(err => {
        console.error('Error fetching transaction receipt:', err);
        reject(err);
      });
  });
}

/**
 * Main function to demonstrate the payment process
 */
async function main() {
  try {
    console.log('=== 1Money Network Payment Transaction Example ===');
    console.log('Creating and signing payment transaction...');

    // Step 1: Create and sign the payment transaction
    const paymentPayload = await createPaymentTransaction(
      privateKey,
      recipientAddress,
      tokenAddress,
      value,
      chainId
    );

    console.log('\nPayment payload created:');
    console.log(JSON.stringify(paymentPayload, null, 2));

    // Step 2: Submit the transaction (commented out for safety)
    console.log('\nTo submit this transaction, uncomment the following lines in the code:');
    console.log('// const response = await submitPaymentTransaction(paymentPayload);');

    // Uncomment to actually submit the transaction
    // Note: This will fail with the example private key
    // const response = await submitPaymentTransaction(paymentPayload);
    // console.log('\nTransaction submitted:', response);

    // Step 3: Verify the transaction (commented out for safety)
    // if (response && response.hash) {
    //   console.log('\nWaiting for transaction confirmation...');
    //   // Wait a bit for the transaction to be processed
    //   await new Promise(resolve => setTimeout(resolve, 5000));
    //
    //   // Verify the transaction status
    //   const receipt = await verifyTransaction(response.hash);
    //   console.log('\nTransaction status:', receipt.success ? 'SUCCESS' : 'FAILED');
    // }

    console.log('\nExample completed successfully');
    console.log('=== End of Example ===');
  } catch (error) {
    console.error('\nError in payment example:', error);
  }
}

// Run the example if this file is executed directly
// In ES modules, there's no direct equivalent to require.main === module
// So we'll just execute the main function
console.log('Running payment transaction example...');
main().catch(console.error);

export {
  createPaymentTransaction,
  submitPaymentTransaction,
  verifyTransaction
};
