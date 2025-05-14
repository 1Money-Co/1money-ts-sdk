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
