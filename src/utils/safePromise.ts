
import { logger } from './logger';

// concurrent
export function safePromiseAll<T extends readonly unknown[] | []>(arr: T) {
  if (!arr || !arr.length) return Promise.resolve([]);

  return Promise.all(arr).catch(e => {
    logger.error(`safePromiseAll with error ${e?.message ?? e} in ${e?.stack ?? '?x?'}`, arr);
    throw e;
  });
}

// serial
export async function safePromiseLine<T extends unknown>(arr: ((ind: number) => Promise<T>)[]) {
  if (!arr || !arr.length) return [];

  const res = [] as Awaited<T>[];
  for (let i = 0; i < arr.length; i++) {
    try {
      res.push(await arr[i](i));
    } catch (e: any) {
      logger.error(`safePromiseLine(${i}) with error ${e?.message ?? e}`, arr);
    }
  }
  return res;
}