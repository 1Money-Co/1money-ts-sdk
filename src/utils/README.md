# utils
This document provides an overview of each utility available in the `utils`.

## safePromiseAll
The `safePromiseAll` function is used to handle an array of promises concurrently. If any of the promises in the array fail, the error is caught, logged, and then re-thrown, ensuring that the error can be handled or propagated as needed.

### Usage
```typescript
import { safePromiseAll } from '@1money/protocol-ts-sdk/utils';

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
import { safePromiseLine } from '@1money/protocol-ts-sdk/utils';

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
import { _typeof } from '@1money/protocol-ts-sdk/utils';

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
