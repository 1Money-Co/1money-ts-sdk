import { api } from './api';
import client from './client';

export { api } from './api';
export { default as client } from './client';
export * from './utils';

export default {
  api,
  client,
};