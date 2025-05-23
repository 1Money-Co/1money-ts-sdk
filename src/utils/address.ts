import { keccak256, hexToBytes, stringToBytes, bytesToHex } from 'viem';

export type Address = `0x${string}`;

/**
 * Derives the token account address given the wallet address and mint address.
 * 
 * Address is 20 byte, 160 bits. Let's say if we want to support 50 billion
 * accounts on 1money. That's about 36 bits. There are 124 bits remaining. In
 * other words, the collision probability is 1/2^124, which is very very low.
 * So, we will be fine to just use the hash of the wallet address and mint
 * address to derive the token account address.
 * 
 * @param walletAddress - The wallet address (20 bytes)
 * @param mintAddress - The mint address (20 bytes)
 * @returns The derived token account address
 */
export function deriveTokenAddress(
  walletAddress: string,
  mintAddress: string,
): Address {
  const walletBytes: Uint8Array = walletAddress.startsWith('0x')
    ? hexToBytes(walletAddress as Address)
    : stringToBytes(walletAddress);
  const mintBytes: Uint8Array = mintAddress.startsWith('0x')
    ? hexToBytes(mintAddress as Address)
    : stringToBytes(mintAddress);

  const combined = new Uint8Array(walletBytes.length + mintBytes.length);
  combined.set(walletBytes, 0);
  combined.set(mintBytes, walletBytes.length);

  const hashHex = keccak256(combined);
  const hashBytes = hexToBytes(hashHex);

  const addressBytes = hashBytes.slice(12);
  return bytesToHex(addressBytes) as Address;
}