# Checkpoints API

The Checkpoints API provides access to checkpoint-related endpoints.

## Usage

```typescript
import { api } from '@1money/protocol-ts-sdk/api';

// Initialize the API client
const apiClient = api();

// Use the checkpoints API
apiClient.checkpoints.getNumber()
  .success(response => {
    console.log('Current checkpoint number:', response.number);
  })
  .error(error => {
    console.error('Error fetching checkpoint number:', error);
  });
```

## Available Endpoints

### `getNumber()`

Returns the current checkpoint number.

**API Endpoint:** `https://api.testnet.1money.network/v1/checkpoints/number`

**Example Response:**

```json
{
  "number": 147411
}
```

## Testing

The API includes tests that verify the structure and behavior of the API client. The tests make real API calls to the remote endpoint to ensure the API is working correctly. To run the tests, use:

```bash
npm test
```

This will run all tests, including the checkpoint API tests that make real API calls.

### Example

There's also an example test that demonstrates how to use the API:

```bash
npx mocha --config .mocharc.js src/api/checkpoints/__test__/example.test.ts
```

This will fetch and display the current checkpoint number from the API.
