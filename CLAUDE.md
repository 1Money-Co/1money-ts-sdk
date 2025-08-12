# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building
- `npm run build` - Build the project using omni build tool (generates lib/, es/, and umd/ directories)
- `npm run build:remote` - Build for remote deployment with RUN_ENV=remote

### Testing
- `npm test` - Run all tests using Mocha with nyc coverage
- Tests are located in `src/**/__test__/*.ts` files
- Uses Mocha with TypeScript support via tsx loader

### Linting & Code Quality
- `npm run lint` - Run both Prettier and ESLint checks
- `npm run lint:fix` - Auto-fix Prettier and ESLint issues
- `npm run lint:es` - ESLint TypeScript files in src/
- `npm run lint:prettier` - Check Prettier formatting
- Individual fix commands: `lint:es_fix`, `lint:prettier_fix`

### Development Workflow
- `npm run new` - Generate new components using omni CLI
- `npm run release` - Release package using omni tool

## Project Architecture

This is a TypeScript SDK for the 1Money Network Protocol with a modular architecture:

### Core Structure
- **src/index.ts** - Main entry point, exports api client and utilities
- **src/api/** - API client modules for different endpoints (accounts, tokens, transactions, checkpoints, chain)
- **src/client/** - Core HTTP client with promise wrapper system
- **src/utils/** - Utility functions for signing, address derivation, transaction hashing

### Key Architecture Patterns

#### API Client Pattern
The main `api()` function creates a configured client that returns typed API modules. It supports:
- Network selection (mainnet/testnet/local) with automatic base URL switching
- Configurable timeouts
- Modular API endpoints (accounts, tokens, transactions, checkpoints, chain)

#### Promise Wrapper System
Uses a custom promise wrapper in `src/client/core.ts` that provides:
- `.success()`, `.error()`, `.timeout()`, `.rest()` handlers
- Support for both traditional promise chains and async/await
- Structured error handling with typed responses

#### Module Organization
Each API module (accounts, tokens, etc.) has:
- `index.ts` - API methods
- `types.ts` - TypeScript interfaces
- `__test__/index.test.ts` - Unit tests
- `README.md` - Module documentation

### Build System
- Uses **omni-door CLI** for build orchestration
- **Rollup** for bundling with multiple output formats:
  - CommonJS (`lib/`)
  - ES Modules (`es/`)
  - UMD bundle (`umd/1money-ts-sdk.min.js`)
- **tsc-alias** for path alias resolution
- External dependencies: axios, viem, @ethereumjs/rlp (peer dependencies)

### TypeScript Configuration
- Target: ESNext with strict mode enabled
- Path aliases: `@/*` maps to `src/*`
- Generates declaration files (.d.ts)
- Excludes test files from compilation

### Testing Strategy
- Uses Mocha with nyc for coverage
- Tests located alongside source files in `__test__/` directories
- Supports both TypeScript and JavaScript test files
- 60-second timeout for async operations