import type { APP_ENV } from '@/constants';

export const domainCheck = (hostname: string) => ({
  local: /(localhost|127\.0\.0\.1|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g.test(hostname),
  dev: /dev\.1money\.com/g.test(hostname),
  preview: /preview\.1money\.com/g.test(hostname),
  prod: /1money\.com/g.test(hostname),
} as const);

export function getEnv(): APP_ENV {
  let res: APP_ENV | undefined;
  if (typeof window !== 'undefined') {
    const { hostname } = location;
    const domainMap = domainCheck(hostname);
    // @ts-ignore
    Object.keys(domainMap).some((v: APP_ENV) => {
      if (domainMap[v]) {
        res = v;
        return true;
      }
      return false;
    });
  } else {
    res = process?.env?.ENV as APP_ENV;
  }

  return (res || 'prod').toLowerCase() as APP_ENV;
}

export default getEnv;
