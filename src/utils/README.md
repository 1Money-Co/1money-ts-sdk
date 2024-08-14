# utils
The `utils` folder contains utility functions and modules that are used across the project to perform common tasks, manage configurations, handle promises, and more. This document provides an overview of each utility available in the `utils` folder.

## getEnv
The `getEnv` function is used to determine the current environment of the application.

### Usage

```typescript
import { getEnv } from '@1money/js-sdk/utils';

const env = getEnv();

console.info(`Current environment: ${env}`);
```

## logger
The `logger` utility is a centralized logging system designed to handle and format logs consistently across different environments.

### Usage

```typescript
import { logger } from '@1money/js-sdk/utils';
import { ENV } from '@/constants';

logger.appName = 'MyAppName';

logger.logLevel =
  ENV === 'prod'
    ? 2
    : ENV === 'local'
      ? 1
      : 0;

logger.prefix = 'MyModule';

logger.format = 'json';

logger.debug('This is a debug message');
logger.log('This is a detail message');
logger.info('This is an important info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.logger('warn', 'This is a warning message');
```

### Properties & Parameters 
#### appName
The `appName` property is used to set the name of the application that is being logged. This is useful for identifying the source of the logs.

#### logLevel
```typescript
export enum LogLevel {
  debug, // 0
  log, // 1
  info, // 2
  warn, // 3
  error, // 4
  silent, // 5
}
```
- **debug**: Information typically useful for debugging.

- **log**: General detailed messages.

- **info**: Important informational messages.

- **warn**: Warnings that are not necessarily errors but could be problematic.

- **error**: Error messages indicating a failure.

- **silent**: Disables all logging.

#### format
- **raw**: Outputs the message as is.

- **json**: Logs are formatted as JSON objects, suitable for structured logging.

- **string**: Logs are formatted as strings with additional contextual information like timestamps, prefix and suffix.

#### prefix
The `prefix` property is used to set a prefix for the log messages. This is useful for adding additional context to the logs.

#### suffix
The `suffix` property is used to set a suffix for the log messages. This is useful for adding additional context to the logs.

#### clone
The `clone` property is used to clone the logger instance. This is useful for creating a new logger instance with the same configuration as the original logger.

## safePromiseAll
The `safePromiseAll` function is used to handle an array of promises concurrently. If any of the promises in the array fail, the error is caught, logged, and then re-thrown, ensuring that the error can be handled or propagated as needed.

### Usage
```typescript
import { safePromiseAll } from '@1money/js-sdk/utils';

async function fetchData() {
  try {
    const [data1, data2, data3] = await safePromiseAll([
      fetch('/api/data1'),
      fetch('/api/data2'),
      fetch('/api/data3'),
    ]);
    // Handle the fetched data
  } catch (error) {
    // Handle the error
  }
}

fetchData();
```

## safePromiseLine
The `safePromiseLine` function is used to execute an array of promise-returning functions sequentially. If any function fails, the error is caught and logged, but the execution continues with the next function. This is useful when you need to perform a series of operations that depend on each other or should be executed in order.

### Usage
```typescript
import { safePromiseLine } from '@1money/js-sdk/utils';

async function processTasks() {
  const results = await safePromiseLine([
    async (index) => {
      const data = await fetch(`/api/task/${index}`);
      return data.json();
    },
    async (index) => {
      const data = await fetch(`/api/task/${index}`);
      return data.json();
    },
    async (index) => {
      const data = await fetch(`/api/task/${index}`);
      return data.json();
    },
  ]);

  // Handle the results of the tasks
}

processTasks();
```

## _typeof
The `_typeof` utility function extends the functionality of JavaScript's native `typeof` operator by providing a more detailed and accurate type checking for various JavaScript values. This function is particularly useful when you need to distinguish between different object types, such as arrays, dates, or maps, which are all identified as "object" by the standard `typeof` operator.

## Usage

### Basic Type Checking

You can use the `_typeof` function to determine the type of any given value, which is particularly useful in situations where you need more granular type information than what is provided by the standard `typeof` operator.

#### Example Usage

```typescript
import { _typeof } from '@1money/js-sdk/utils';

console.log(_typeof('Hello, World!')); // Output: 'string'
console.log(_typeof(42));              // Output: 'number'
console.log(_typeof(true));            // Output: 'boolean'
console.log(_typeof(Symbol('id')));    // Output: 'symbol'
console.log(_typeof({}));              // Output: 'object'
console.log(_typeof([]));              // Output: 'array'
console.log(_typeof(() => {}));        // Output: 'function'
console.log(_typeof(new Date()));      // Output: 'date'
console.log(_typeof(/abc/));           // Output: 'regexp'
console.log(_typeof(new Set()));       // Output: 'set'
console.log(_typeof(new Map()));       // Output: 'map'
console.log(_typeof(null));            // Output: 'null'
console.log(_typeof(undefined));       // Output: 'undefined'
```

## request
The `request` module is a comprehensive wrapper around `axios` for handling HTTP requests in a structured and consistent way. It provides a flexible API for making HTTP requests with built-in support for error handling, logging, and customizable success, failure, and timeout behaviors. This utility simplifies API interactions and helps in maintaining consistent request handling across the application.

### Usage
#### Configuration
```typescript
import { setInitConfig } from '@1money/js-sdk/utils';

setInitConfig({
  isSuccess: (res = {}, status) => status === 200 && res?.code == 0,
  isLogin: (res = {}, status) => status === 401 || res?.code == 401,
  onLogin: () => location.assign('/login'),
  timeout: 10000
});
```

#### Basic
```typescript
import { get, post } from '@1money/js-sdk/utils';

get('/api/data')
  .success(response => {
    console.log('Data received:', response);
  })
  .failure(response => {
    console.warn('Request failed:', response);
  })
  .login(() => {
    console.log('Login required, redirecting...');
  })
  .timeout(() => {
    console.error('Request timed out');
  })
  .error(error => {
    console.error('An unexpected error occurred:', error);
  });

post('/api/data', { key: 'value' }, {
  headers: {
    'Authorization': 'Bearer token xxxx'
  },
  timeout: 5000 // Override default timeout for this request
})
  .success(response => {
    console.log('Custom configuration success:', response);
  })
  .error(error => {
    console.error('Custom configuration error:', error);
  });
```

#### Making Other HTTP Requests
The module also supports `PUT`, `PATCH`, and `DELETE` methods in a similar manner:

```typescript
import { put, patch, del } from '@1money/js-sdk/utils';

put(url, data, options);

patch(url, data, options);

del(url, data, options);
```

These methods follow the same pattern as get and post, allowing you to handle different outcomes with chained handlers.