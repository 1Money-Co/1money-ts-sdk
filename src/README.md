# 1Money TypeScript SDK

The official TypeScript SDK for interacting with the 1Money Network Protocol.

## Modules

### [API](./api)
`@1money/ts-sdk/api`

The API module provides access to the 1Money network API endpoints, including:
- Account management
- Token operations
- Transaction handling
- Checkpoint information

### [Client](./client)
`@1money/ts-sdk/client`

The client module is a comprehensive wrapper around `axios` for handling HTTP requests. It provides:
- Structured and consistent HTTP request handling
- Built-in error handling
- Customizable success, failure, and timeout behaviors
- Logging capabilities

### [Utils](./utils)
`@1money/ts-sdk/utils`

The utils module contains utility functions and modules used across the project:
- `safePromiseAll`: Handle multiple promises concurrently with error catching

- `safePromiseLine`: Execute promises sequentially with error handling

- `_typeof`: Enhanced type checking utility
- Logging utilities

- `calcTxHash`: Calculate transaction hash from payload and signature
  - Takes a payload (boolean | string | number | bigint | Uint8Array | Array | null | undefined) and signature object ({r: string, s: string, v: number|boolean})
  - Encodes payload and signature components using RLP encoding
  - Returns keccak256 hash of the encoded transaction data
  - Example:
    ```ts
    const payload = [
      1212101,
      2,
      '0x0000000000000000000000000000000000000000',
      1024,
      '0x0000000000000000000000000000000000000000'
    ];
    const signature = {
      r: '0xe9ef6ce7aaeb4656f197b63a96c932ab5e0fd2df0913f6af1c8e7b1879e5ed0a',
      s: '0x68a9cbaa35af5e3d896a2841d19a42dba729380a1c91864403de872578f6f6c3',
      v: 0
    };
    const txHash = calcTxHash(payload, signature);
    // Returns: 0x87e63407778ce2fc07ba5f51d957eb6966e3eb1f3be75e0287115442bdef1d82
    ```
