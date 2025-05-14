# @1money/ts-sdk
The TS-SDK for 1Money Network Protocol

[![Build Status](https://github.com/1Money-Co/1money-ts-sdk/actions/workflows/cicd-npm.yml/badge.svg)](https://github.com/1Money-Co/1money-ts-sdk/actions/workflows/cicd-npm.yml)
[![NPM downloads](http://img.shields.io/npm/dm/%401money%2Fts-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@1money/ts-sdk)
[![npm version](https://badge.fury.io/js/%401money%2Fts-sdk.svg)](https://badge.fury.io/js/%401money%2Fts-sdk)
[![install size](https://packagephobia.now.sh/badge?p=%401money%2Fts-sdk)](https://packagephobia.now.sh/result?p=%401money%2Fts-sdk)
[![license](http://img.shields.io/npm/l/%401money%2Fts-sdk.svg)](https://github.com/1money/tpls/blob/master/packages/ts-sdk/LICENSE)

## Quick start
### Install
```shell
npm i -S @1money/ts-sdk axios
# or
yarn add @1money/ts-sdk axios
# or
pnpm i @1money/ts-sdk axios
```

### Initialize the API Client

```typescript
import { api } from '@1money/ts-sdk';

// Initialize with default settings (mainnet)
const apiClient = api();

// Or specify testnet network
const testnetClient = api({ network: 'testnet' });

// You can also set a custom timeout (in milliseconds)
const apiClient = api({
  network: 'testnet',
  timeout: 5000 // 5 seconds
});
```

### CDN
```html
<script src="https://unpkg.com/@1money/ts-sdk@latest/umd/1money-ts-sdk.min.js"></script>

<script>
  const apiClient = window.$1money.api({
    network: 'testnet'
  });

  async function getNumber () {
    const number = await apiClient.checkpoints.getNumber();
    console.log('number', number);
  }

  getNumber();
</script>
```

### Error Handling

All API methods return a promise-like object with `.success()`, `.timeout()`, `.error()` and `.rest()` handlers. Always implement both handlers for proper error management:

1. `.success()`: Handles successful API responses
2. `.timeout()`: Specifically handles timeout errors
3. `.error()`: Handles all other types of errors
4. `.rest()`: A final handler that runs after any of the above handlers complete

```typescript
apiClient.someMethod()
  .success(response => {
    // Handle successful response
  })
  .timeout(err => {
    // Handle timeout case
  })
  .error(err => {
    // Handle other errors
  });
```

```typescript
apiClient.someMethod()
  .success(response => {
    // Handle successful response
  })
  .rest(err => {
    // Handle other cases
  });
```

### Common Operations

#### 1. Get Account Nonce
```typescript
const address = '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3';
apiClient.accounts.getNonce(address)
  .success(response => {
    console.log('Account nonce:', response);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 2. Get Token Metadata
```typescript
const tokenAddress = '0x2cd8999Be299373D7881f4aDD11510030ad1412F';
apiClient.tokens.getTokenMetadata(tokenAddress)
  .success(response => {
    console.log('Token metadata:', response);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 3. Get Current Checkpoint
```typescript
apiClient.checkpoints.getNumber()
  .success(response => {
    console.log('Current checkpoint number:', response.number);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 4. Estimate Transaction Fee
```typescript
const fromAddress = '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3';
const value = '1000000000';
const tokenAddress = '0x2cd8999Be299373D7881f4aDD11510030ad1412F';

apiClient.transactions.estimateFee(fromAddress, value, tokenAddress)
  .success(response => {
    console.log('Estimated fee:', response);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 5. Get Transaction Details
```typescript
const txHash = '0xf55f9525be94633b56f954d3252d52b8ef42f5fd5f9491b243708471c15cc40c';
apiClient.transactions.getByHash(txHash)
  .success(response => {
    console.log('Transaction details:', response);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

## License
MIT