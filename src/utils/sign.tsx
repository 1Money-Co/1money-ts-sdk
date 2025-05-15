import { ethers, keccak256, toUtf8Bytes, hexlify, encodeRlp, toBeArray } from 'ethers';
import { _typeof } from '@/utils';


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
export function signMessage(payload: Array<string | Uint8Array | Array<any>>, privateKey: string): Signature | null {
  try {
    // 1. RLP encode the message
    const encoded = encodeRlp(payload);

    // 2. Calculate Keccak256 hash
    const hashHex = keccak256(encoded);

    // 3. to bytes array
    const hashBytes = toBeArray(hashHex);

    // 4. sign
    const signingKey = new ethers.SigningKey(privateKey);
    const signatureData = signingKey.sign(hashBytes);

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

export function toHex(value: any): string {
  const type = _typeof(value);
  try {
    switch (type) {
      case 'boolean':
        return value ? '0x01' : '0x00';
      case 'number':
      case 'bigint':
        return ethers.toBeHex(value);
      case 'string':
        if (value.startsWith('0x')) return value;
        else if (!isNaN(+value)) return ethers.toBeHex(value);
        return hexlify(toUtf8Bytes(value as string));
      case 'uint8array':
      case 'uint16array':
      case 'uint32array':
      case 'int8array':
      case 'int16array':
      case 'int32array':
      case 'arraybuffer':
        return hexlify(value);
      case 'array':
        if (value.length === 0) return '0x';
        else if ((value as Array<any>).every(item => typeof item === 'number')) return hexlify(value);
        else return hexlify(toUtf8Bytes(JSON.stringify(value)));
      case 'object':
        return hexlify(toUtf8Bytes(JSON.stringify(value)));
      default:
        return value;
    }
  } catch (e) {
    console.error('[1Money toHex]: ', e);
    return value;
  }
}
