// Example of using the 1money testnet API to fetch checkpoint number

// Import the API directly from the source
const { api } = require('../src/api');

// Initialize the API client
const apiClient = api();

// Fetch the current checkpoint number using the checkpoints API
apiClient.checkpoints.getNumber()
  .success(response => {
    console.log('Current checkpoint number:', response.number);
  })
  .error(error => {
    console.error('Error fetching checkpoint number:', error);
  });

// The API is organized into different modules:
// - apiClient.accounts - Account-related API endpoints
// - apiClient.tokens - Token-related API endpoints
// - apiClient.transactions - Transaction-related API endpoints
// - apiClient.checkpoints - Checkpoint-related API endpoints
