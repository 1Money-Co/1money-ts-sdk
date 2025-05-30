import { keccak256, hexToBytes, bytesToHex } from 'viem';
import { encode as rlpEncode } from '@ethereumjs/rlp';

import { encodePayload } from './sign';

import type { Payload, Signature } from './interface';

function encodeRlpListHeader(length: number): Uint8Array {
  if (length < 56) {
    // Short list: single byte prefix
    return Uint8Array.from([0xc0 + length]);
  } else {
    // Long list: prefix 0xf7 + length of length + actual length bytes
    const lenBytes: number[] = [];
    let temp = length;
    while (temp > 0) {
      lenBytes.unshift(temp & 0xff);
      temp >>= 8;
    }
    return Uint8Array.from([0xf7 + lenBytes.length, ...lenBytes]);
  }
}

export function calcTxHash(payload: Payload, signature: Signature) {
  const pEncode = encodePayload(payload);
  const vEncode = rlpEncode(
    typeof signature.v === 'boolean'
      ? signature.v
        ? Uint8Array.from([1])
        : new Uint8Array([])
      : BigInt(signature.v)
  );
  const rEncode = rlpEncode(hexToBytes(signature.r));
  const sEncode = rlpEncode(hexToBytes(signature.s));
  const vrsBytes = new Uint8Array(vEncode.length + rEncode.length + sEncode.length);
  vrsBytes.set(vEncode, 0);
  vrsBytes.set(rEncode, vEncode.length);
  vrsBytes.set(sEncode, vEncode.length + rEncode.length);
  const header = encodeRlpListHeader(pEncode.length + vrsBytes.length);
  const encoded = new Uint8Array(header.length + pEncode.length + vrsBytes.length);
  encoded.set(header, 0);
  encoded.set(pEncode, header.length);
  encoded.set(vrsBytes, header.length + pEncode.length);
  return keccak256(encoded);
}
