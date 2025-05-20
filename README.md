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
npm i -S @1money/ts-sdk axios ethers
# or
yarn add @1money/ts-sdk axios ethers
# or
pnpm i @1money/ts-sdk axios ethers
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

### Fetch the current checkpoint number

```typescript
const number = await apiClient.checkpoints.getNumber()
  .success(response => {
    console.log('number', response.number);
    return response.number;
  })
  .error(err => {
    console.error('Error:', err);
    // return a default value
    return 0;
  });

// do something with the number
// ...
```
### Get checkpoint by number
```typescript
const checkpoint = await apiClient.checkpoints.getByNumber(1)
  .success(response => {
    console.log('checkpoint', response);
  });
```

## CDN
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

## Error Handling

All API methods return a promise-like object with `.success()`, `.timeout()`, `.error()` and `.rest()` handlers. Always implement both handlers for proper error management:

1. `.success()`: Handles successful API responses
2. `.timeout()`: Specifically handles timeout errors
3. `.error()`: Handles all other types of errors
4. `.rest()`: A final handler that runs after any of the above handlers complete

```typescript
import { api } from '@1money/ts-sdk';

const apiClient = api();

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

You can use `rest` to handle all other errors:
```typescript
apiClient.someMethod()
  .success(response => {
    // Handle successful response
  })
  .rest(err => {
    // Handle other cases
  });
```

#### Async/Await
You also can use async/await to handle the response:
```typescript
import { api } from '@1money/ts-sdk';

const apiClient = api();

try {
  const response = await apiClient.someMethod();
  console.log('Response:', response);
} catch (err) {
  console.error('Error:', err);
}
``` 

#### Promise
You also can use standard `promise` to handle the response:
```typescript
import { api } from '@1money/ts-sdk';

const apiClient = api();

apiClient.someMethod()
  .then(response => {
    console.log('Response:', response);
  })
  .catch(err => {
    console.error('Error:', err);
  });
```

## API Methods

### Signature Generation
Before using the API methods that require signatures, you'll need to generate them using the provided utility functions:

```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Example: Generate signature for a payment transaction
const paymentPayload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // recipient
  toHex('1000000000'), // value
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
];

const signature = signMessage(paymentPayload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// The signature object will have the correct r, s, v format
console.log('Generated signature:', signature);
// Output example:
// {
//   r: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
//   s: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
//   v: 27
// }
```

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

#### 6. Get Transaction Receipt
```typescript
const txHash = '0xf55f9525be94633b56f954d3252d52b8ef42f5fd5f9491b243708471c15cc40c';
apiClient.transactions.getReceiptByHash(txHash)
  .success(response => {
    console.log('Transaction receipt:', response);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 7. Submit Payment Transaction
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // recipient
  toHex('1000000000'), // value
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the payment payload
const paymentPayload = {
  chain_id: 1,
  nonce: 1,
  recipient: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  value: '1000000000',
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  signature
};

apiClient.transactions.payment(paymentPayload)
  .success(response => {
    console.log('Payment transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 8. Cancel Transaction
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the cancellation payload
const cancellationPayload = {
  chain_id: 1,
  nonce: 1,
  signature
};

apiClient.transactions.cancel(cancellationPayload)
  .success(response => {
    console.log('Cancellation transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

#### 9. Token Management Methods

##### Issue New Token
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  toHex('My Token'), // name
  toHex('MTK'), // symbol
  toHex(18), // decimals
  '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3', // master_authority
  toHex(true), // is_private
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the issue payload
const issuePayload = {
  chain_id: 1,
  nonce: 1,
  name: 'My Token',
  symbol: 'MTK',
  decimals: 18,
  master_authority: '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3',
  is_private: true,
  signature
};

apiClient.tokens.issueToken(issuePayload)
  .success(response => {
    console.log('Token issued:', response);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

##### Mint Tokens
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
  '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3', // recipient
  toHex('1000000000000000000'), // amount
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the mint payload
const mintPayload = {
  chain_id: 1,
  nonce: 1,
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  recipient: '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3',
  value: '1000000000000000000',
  signature
};

apiClient.tokens.mintToken(mintPayload)
  .success(response => {
    console.log('Mint transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

##### Burn Tokens
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
  toHex('1000000000000000000'), // amount
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the burn payload
const burnPayload = {
  chain_id: 1,
  nonce: 1,
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  value: '1000000000000000000',
  signature
};

apiClient.tokens.burnToken(burnPayload)
  .success(response => {
    console.log('Burn transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

##### Update Token Metadata
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
  toHex('Updated Token Name'), // name
  toHex('https://example.com/metadata'), // uri
  toHex([]), // additional_metadata
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the metadata payload
const metadataPayload = {
  chain_id: 1,
  nonce: 1,
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  name: 'Updated Token Name',
  uri: 'https://example.com/metadata',
  additional_metadata: [],
  signature
};

apiClient.tokens.updateMetadata(metadataPayload)
  .success(response => {
    console.log('Metadata update transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

##### Set Token Manage List Status
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';
import type { ManageListAction, AuthorityType, AuthorityAction, PauseAction } from '@1money/ts-sdk/api';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
  '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3', // address
  toHex(ManageListAction.Blacklist), // action
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the manage list payload
const manageListPayload = {
  chain_id: 1,
  nonce: 1,
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  address: '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3',
  action: ManageListAction.Blacklist,
  signature
};

apiClient.tokens.setManageList(manageListPayload)
  .success(response => {
    console.log('Manage list update transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

##### Grant Token Authority
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';
import type { AuthorityType, AuthorityAction } from '@1money/ts-sdk/api';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
  '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3', // authority_address
  toHex(AuthorityAction.Grant), // action
  toHex(AuthorityType.MasterMint), // authority_type
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the authority payload
const authorityPayload = {
  chain_id: 1,
  nonce: 1,
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  authority_address: '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3',
  action: AuthorityAction.Grant,
  authority_type: AuthorityType.MasterMint,
  signature
};

apiClient.tokens.grantAuthority(authorityPayload)
  .success(response => {
    console.log('Authority update transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

##### Pause/Unpause Token
```typescript
import { signMessage, toHex } from '@1money/ts-sdk';
import type { PauseAction } from '@1money/ts-sdk/api';

// Your private key (DO NOT share or commit your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create the payload array for signing
const payload = [
  toHex(1), // chain_id
  toHex(1), // nonce
  '0x2cd8999Be299373D7881f4aDD11510030ad1412F', // token
  toHex(PauseAction.Pause), // action
];

// Generate signature
const signature = signMessage(payload, privateKey);
if (!signature) {
  throw new Error('Failed to generate signature');
}

// Create the pause payload
const pausePayload = {
  chain_id: 1,
  nonce: 1,
  token: '0x2cd8999Be299373D7881f4aDD11510030ad1412F',
  action: PauseAction.Pause,
  signature
};

apiClient.tokens.pauseToken(pausePayload)
  .success(response => {
    console.log('Pause status update transaction hash:', response.hash);
  })
  .error(err => {
    console.error('Error:', err);
  });
```

## License
MIT