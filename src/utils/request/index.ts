import Request from './request';

import type { InitConfig, Options } from './request';

const { request, setting, axios } = new Request({
  isSuccess: (res, status) => status === 200 && res.code === 0,
  isLogin: (res, status) => status === 401 || res.code === 401,
  timeout: 10000
});

export function get<T>(
  url: string,
  options?: Omit<Options<T>, 'method' | 'url'>
) {
  return request<T>({
    baseURL: typeof window !== 'undefined' ? location.origin : void 0,
    ...options,
    method: 'get',
    url
  });
}

export function post<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'method' | 'url' | 'data'>
) {
  return request<T>({
    baseURL: typeof window !== 'undefined' ? location.origin : void 0,
    ...options,
    method: 'post',
    url,
    data,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json'
    }
  });
}

export function postForm<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'method' | 'url' | 'data'>
) {
  return request<T>({
    baseURL: typeof window !== 'undefined' ? location.origin : void 0,
    ...options,
    method: 'post',
    url,
    data
  });
}

export function put<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'method' | 'url' | 'data'>
) {
  return request<T>({
    baseURL: typeof window !== 'undefined' ? location.origin : void 0,
    ...options,
    method: 'put',
    url,
    data,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json'
    }
  });
}

export function patch<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'method' | 'url' | 'data'>
) {
  return request<T>({
    baseURL: typeof window !== 'undefined' ? location.origin : void 0,
    ...options,
    method: 'patch',
    url,
    data,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json'
    }
  });
}

export function del<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'method' | 'url' | 'data'>
) {
  return request<T>({
    baseURL: typeof window !== 'undefined' ? location.origin : void 0,
    ...options,
    method: 'delete',
    url,
    data,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json'
    }
  });
}

export function setInitConfig(config: InitConfig & { baseURL?: string }) {
  const { baseURL, ...rest } = config;
  if (baseURL) axios.defaults.baseURL = baseURL;
  setting(rest);
}