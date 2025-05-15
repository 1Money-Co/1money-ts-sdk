import { ethers, keccak256, encodeRlp } from 'ethers';

interface Payload {
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
 * @param payload Payload to sign
 * @param privateKey Private key to sign with
 * @returns Signature object with r, s, v components
 */
export function signMessage(payload: string[], privateKey: string): Signature | null {
  try {
    // 1. RLP encode the message
    const encoded = encodeRlp(payload);

    // 2. Calculate Keccak256 hash
    const hash = keccak256(encoded);

    // 3. sign
    const signingKey = new ethers.SigningKey(privateKey);
    const signatureData = signingKey.sign(ethers.getBytes(hash));

    return {
      r: signatureData.r,
      s: signatureData.s,
      v: signatureData.v,
    };
  } catch (error) {
    console.error('[1Money signMessage]: ', error);
    return null;
  }
}

export function toHex(value: number | bigint | string): string {
  return ethers.toBeHex(value);
}
