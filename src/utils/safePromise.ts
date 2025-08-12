
// concurrent
export function safePromiseAll<T extends readonly Promise<any>[]>(arr: T): Promise<Awaited<T[number]>[]> {
  if (!arr || !arr.length) return Promise.resolve([]);

  return Promise.all(arr);
}

// serial
export async function safePromiseLine<T extends unknown>(arr: ((ind: number) => Promise<T>)[]) {
  if (!arr || !arr.length) return [];

  const res = [] as Awaited<T>[];
  for (let i = 0; i < arr.length; i++) {
    try {
      res.push(await arr[i](i));
    } catch (e) {
      // ignore
    }
  }
  return res;
}