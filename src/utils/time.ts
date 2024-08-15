import { logger } from './logger';

export function tsCalculator() {
  const startTs = performance.now();
  return function () {
    return performance.now() - startTs;
  };
}

type NotFN = () => false;
type Next = Promise<() => void>;

const notGF: NotFN = function () {
  logger.warn('Please pass the [Generator Function]');
  return false;
};

export function timeslice(genF: () => Generator, threshold = 50): NotFN | Next {
  if (!genF || typeof genF !== 'function') return notGF;
  const gen: Generator = genF();

  if (typeof gen.next !== 'function') return notGF;

  return new Promise((resolve, reject) => {
    function next(): void {
      try {
        const getTs = tsCalculator();
        let res = null;

        do {
          res = gen.next();
        } while (!res.done && getTs() < threshold);

        if (res.done) {
          resolve(res.value);
          return;
        }
        setTimeout(next);
      } catch (err) {
        reject(err);
      }
    }

    next();
  });
}