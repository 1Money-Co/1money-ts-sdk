import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export function divided(
  num: BigNumber.Value,
  base: BigNumber.Value
): BigNumber {
  return new BigNumber(num).dividedBy(base);
}

export function plus(info: Array<BigNumber.Value>): BigNumber;
export function plus(
  base: BigNumber.Value,
  num: BigNumber.Value,
  ...args: Array<BigNumber.Value>
): BigNumber;
export function plus(...data: any[]): BigNumber {
  const [base, num, ...args] = data;
  if (Array.isArray(base)) {
    return base.reduce(
      (a: BigNumber, b) => a.plus(b || 0),
      new BigNumber(0)
    ) as BigNumber;
  }
  if (num === undefined) return new BigNumber(base);
  const res = new BigNumber(base).plus(num);
  return args.reduce((a: BigNumber, b) => a.plus(b || 0), res) as BigNumber;
}

export function minus(a: BigNumber.Value, b: BigNumber.Value): BigNumber {
  return new BigNumber(a).minus(b);
}

export const multiply = (
  base: BigNumber.Value,
  num: BigNumber.Value,
  ...args: Array<BigNumber.Value>
): BigNumber => {
  if (num === undefined) return new BigNumber(base);
  const res = new BigNumber(base).multipliedBy(num);
  return args.reduce(
    (a: BigNumber, b) => a.multipliedBy(b || 0),
    res
  ) as BigNumber;
};

export const isGreaterThan = (
  a: BigNumber.Value,
  b: BigNumber.Value
): boolean => new BigNumber(a).isGreaterThan(b);

export const isGreaterThanOrEqualTo = (
  a: BigNumber.Value,
  b: BigNumber.Value
): boolean => new BigNumber(a).isGreaterThanOrEqualTo(b);

export const isLessThanOrEqualTo = (
  a: BigNumber.Value,
  b: BigNumber.Value
): boolean => new BigNumber(a).isLessThanOrEqualTo(b);

export const isLessThan = (a: BigNumber.Value, b: BigNumber.Value): boolean =>
  new BigNumber(a).isLessThan(b);

export const isEqualTo = (a: BigNumber.Value, b: BigNumber.Value): boolean =>
  new BigNumber(a).isEqualTo(b);


export const getMedian = (arr: number[]) => {
  if (!arr.length) return void 0;
  const midInd = Math.max(Math.floor(arr.length / 2), 0);
  const isEven = !(arr.length % 2);
  arr = arr.sort((a, b) => a - b);
  if (isEven) {
    return divided(arr[midInd] + arr[midInd - 1], 2).toNumber();
  }
  return arr[midInd];
};

export const isNumberLike = (numLike: any) => {
  if (typeof numLike === 'bigint') return true;
  if (numLike == null || !(typeof numLike === 'string' || typeof numLike === 'number')) return false;
  return !isNaN(+numLike);
};

export function toString(
  num: BigNumber.Value | bigint
): string {
  if (typeof num === 'bigint') return '' + num;
  return new BigNumber(num).toString();
}

export function getFirstAndLastItem<T = any>(list: T[]) {
  return {
    first: list?.[0],
    last: list?.[Math.max(0, list.length - 1)]
  };
}

export function formatNumber(
  num: BigNumber.Value | bigint,
  decimals = 2,
  round = false
): string {
  if (typeof num === 'bigint') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const bn = new BigNumber(num);
  if (!round) {
    // dont round
    return bn.decimalPlaces(decimals, BigNumber.ROUND_DOWN).toFormat(decimals, {
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3
    });
  }

  return bn.toFormat(decimals, {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3
  });
}

export function formatOriginal(
  num: BigNumber.Value | bigint
): string {
  if (typeof num === 'bigint') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const bn = new BigNumber(num);
  const decimalPlaces = bn.decimalPlaces() ?? 0;

  return bn.toFormat(decimalPlaces, {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3
  });
}
