# Checkpoints API

The Checkpoints API provides access to checkpoint-related endpoints.

## Usage

```typescript
import { api } from '@1money/protocol-ts-sdk/api';

// Initialize the API client
const apiClient = api();

// Use the chain API
apiClient.chain.getChainId()
  .success(response => {
    console.log('Current chain id:', response.chain_id);
  })
  .error(error => {
    console.error('Error fetching chain id:', error);
  });
```
