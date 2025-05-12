// Common response types
export interface RESTErrorData {
  error_code: string;
  message: string;
}

// Common schema types
export type AddressSchema = string; // Example: "0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC742Ab"
export type TokenAddressSchema = string; // Example: "0x6ADE9688A44D058fF181Ed64ddFAFbBE5CC742Ac"
export type B256Schema = string; // Example: "0xf55f9525be94633b56f954d3252d52b8ef42f5fd5f9491b243708471c15cc40c"
export type U256Schema = string; // Large number as string
export type BytesSchema = string; // Example: "0x2efae2eb"

// Common response wrappers
export interface Hash {
  hash: B256Schema;
}

export interface HashWithToken {
  hash: B256Schema;
  token: TokenAddressSchema;
}
