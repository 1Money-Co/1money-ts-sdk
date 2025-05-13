# utils
This document provides an overview of each utility available in the `utils`.

## logger
The `logger` utility is a centralized logging system designed to handle and format logs consistently across different environments.

### Usage

```typescript
import { logger } from '@1money/ts-sdk/utils';
import { ENV } from '@/constants';

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

#### extra
The `extra` property is used to set additional information to the log messages. This is useful for adding additional context to the logs.

## safePromiseAll
The `safePromiseAll` function is used to handle an array of promises concurrently. If any of the promises in the array fail, the error is caught, logged, and then re-thrown, ensuring that the error can be handled or propagated as needed.

### Usage
```typescript
import { safePromiseAll } from '@1money/ts-sdk/utils';

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
import { safePromiseLine } from '@1money/ts-sdk/utils';

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

### Usage
```typescript
import { _typeof } from '@1money/ts-sdk/utils';

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
