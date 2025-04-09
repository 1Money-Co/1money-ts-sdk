# API

The API module provides access to the 1Money network API endpoints.

## Structure

The API is organized into the following modules:

- `accounts` - Account-related API endpoints
- `tokens` - Token-related API endpoints
- `transactions` - Transaction-related API endpoints
- `checkpoints` - Checkpoint-related API endpoints

## Usage

```typescript
import { api } from '@1money/ts-sdk/api';

// Initialize the API client (defaults to testnet)
const apiClient = api();

// Or specify a different network
const mainnetClient = api({ network: 'mainnet' });
const localClient = api({ network: 'local' });

// Use the API client to make requests
apiClient.checkpoints.getNumber()
  .success(response => {
    console.log('Current checkpoint number:', response.number);
  })
  .error(error => {
    console.error('Error fetching checkpoint number:', error);
  });
```

## Available Endpoints

### Accounts

#### `accounts.getNonce(address)`

Returns the nonce for the specified account address.

**API Endpoint:** `https://api.testnet.1money.network/v1/accounts/nonce?address={address}`

#### `accounts.getTokenAccount(address, token)`

Returns the associated token account for the specified account and token addresses.

**API Endpoint:** `https://api.testnet.1money.network/v1/accounts/token_account?address={address}&token={token}`

### Tokens

#### `tokens.getTokenMetadata(token)`

Returns metadata for the specified token address.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/token_metadata?token={token}`

#### `tokens.setBlacklist(payload)`

Sets the blacklist status for a token address.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/blacklist`

#### `tokens.burnToken(payload)`

Burns tokens.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/burn`

#### `tokens.grantAuthority(payload)`

Grants or revokes token authority.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/grant_authority`

#### `tokens.issueToken(payload)`

Issues a new token.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/issue`

#### `tokens.mintToken(payload)`

Mints tokens.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/mint`

#### `tokens.pauseToken(payload)`

Pauses or unpauses a token.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/pause`

#### `tokens.updateMetadata(payload)`

Updates token metadata.

**API Endpoint:** `https://api.testnet.1money.network/v1/tokens/update_metadata`

### Transactions

#### `transactions.getByHash(hash)`

Returns transaction details for the specified hash.

**API Endpoint:** `https://api.testnet.1money.network/v1/transactions/by_hash?hash={hash}`

#### `transactions.getReceiptByHash(hash)`

Returns transaction receipt for the specified hash.

**API Endpoint:** `https://api.testnet.1money.network/v1/transactions/receipt/by_hash?hash={hash}`

#### `transactions.estimateFee(from, value, token?)`

Estimates transaction fee.

**API Endpoint:** `https://api.testnet.1money.network/v1/transactions/estimate_fee?from={from}&value={value}&token={token}`

#### `transactions.payment(payload)`

Submits a payment transaction.

**API Endpoint:** `https://api.testnet.1money.network/v1/transactions/payment`

#### `transactions.cancel(payload)`

Cancels a transaction.

**API Endpoint:** `https://api.testnet.1money.network/v1/transactions/cancellation`

### Checkpoints

#### `checkpoints.getNumber()`

Returns the current checkpoint number.

**API Endpoint:** `https://api.testnet.1money.network/v1/checkpoints/number`

**Example Response:**

```json
{
  "number": 147411
}
```

#### `checkpoints.getByHash(hash, full)`

Returns checkpoint details for the specified hash.

**API Endpoint:** `https://api.testnet.1money.network/v1/checkpoints/by_hash?hash={hash}&full={full}`

#### `checkpoints.getByNumber(number, full)`

Returns checkpoint details for the specified number.

**API Endpoint:** `https://api.testnet.1money.network/v1/checkpoints/by_number?number={number}&full={full}`

## Testing

The API includes tests that verify the structure and behavior of the API client. The tests make real API calls to the remote endpoint to ensure the API is working correctly. To run the tests, use:

```bash
npm test
```

This will run all tests, including the API tests that make real API calls.

### Example

There's also an example test that demonstrates how to use the API:

```bash
npx mocha --config .mocharc.js src/api/checkpoints/__test__/example.test.ts
```

This will fetch and display the current checkpoint number from the API.
