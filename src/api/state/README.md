# State API

The State API provides access to the current network state information, specifically epoch and checkpoint data that is essential for transaction validation and temporal boundaries.

## Overview

All POST operations in the 1Money Network require recent epoch and checkpoint information to:
- Prevent transaction duplication by tracking recent network state
- Provide transaction lifetimes by establishing temporal boundaries

## Methods

### `getLatestEpochCheckpoint()`

Retrieves the current epoch and checkpoint information from the network.

**Returns:** `Promise<EpochCheckpointResponse>`

```typescript
interface EpochCheckpointResponse {
  epoch: number;                    // Current epoch number
  checkpoint: number;               // Current checkpoint number  
  checkpoint_hash: string;          // Hash of the current checkpoint (0x-prefixed hex)
  checkpoint_parent_hash: string;   // Hash of the parent checkpoint (0x-prefixed hex)
}
```

## Usage

```typescript
import { api } from '@1money/ts-sdk';

const apiClient = api({ network: 'testnet' });

// Get current epoch checkpoint data
const epochData = await apiClient.state.getLatestEpochCheckpoint()
  .success(response => {
    console.log('Current epoch:', response.epoch);
    console.log('Current checkpoint:', response.checkpoint);
    return response;
  });

// Use in POST operations
const paymentPayload = {
  recent_epoch: epochData.epoch,
  recent_checkpoint: epochData.checkpoint,
  chain_id: 1,
  nonce: 1,
  recipient: '0x...',
  value: '1000000000',
  token: '0x...',
  signature: signedData
};

apiClient.transactions.payment(paymentPayload)
  .success(response => {
    console.log('Payment transaction:', response.hash);
  });
```

## API Correspondence

This API corresponds to the l1client endpoint:
- **Endpoint:** `GET /v1/states/latest_epoch_checkpoint`
- **Rust Type:** `EpochCheckpointResponse` in `om-api-types::rest::states`
- **Implementation:** `crates/api/om-api-rest/src/api/states.rs`

The TypeScript interface exactly matches the Rust struct definition, ensuring full compatibility with the 1Money Network Protocol.