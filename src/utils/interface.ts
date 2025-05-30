export type ZeroXString = `0x${string}`;

export interface Signature {
  r: ZeroXString;
  s: ZeroXString;
  v: number | boolean;
}

export type Payload = boolean | string | number | bigint | Uint8Array | Array<Payload> | null | undefined;