import Request from './core';

import type { InitConfig, Options } from './core';

const { request, setting, axios } = new Request({
  isSuccess: (res, status) => status === 200 && res.code == 0,
  isLogin: (res, status) => status === 401 || res.code == 401,
  timeout: 10000
});

export function get<T, U = unknown>(
  url: string,
  options?: Omit<Options<T, U>, 'method' | 'url'>
) {
  return request<T, U>({
    ...options,
    method: 'get',
    url
  });
}

export function post<T, U = unknown>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T, U>, 'method' | 'url' | 'data'>
) {
  return request<T, U>({
    ...options,
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    }
  });
}

export function postForm<T, U = unknown>(
  url: string,
  data: FormData,
  options?: Omit<Options<T, U>, 'method' | 'url' | 'data'>
) {
  return request<T, U>({
    ...options,
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...options?.headers,
    }
  });
}

export function put<T, U = unknown>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T, U>, 'method' | 'url' | 'data'>
) {
  return request<T, U>({
    ...options,
    method: 'put',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    }
  });
}

export function patch<T, U = unknown>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T, U>, 'method' | 'url' | 'data'>
) {
  return request<T, U>({
    ...options,
    method: 'patch',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    }
  });
}

export function del<T, U = unknown>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T, U>, 'method' | 'url' | 'data'>
) {
  return request<T, U>({
    ...options,
    method: 'delete',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    }
  });
}

export function setInitConfig(config: InitConfig) {
  const { baseURL, ...rest } = config;
  axios.defaults.baseURL = baseURL || (typeof window !== 'undefined' ? location.origin : void 0);
  setting(rest);
}

export type { InitConfig, Options, ParsedError, PromiseWrapper } from './core';

export const axiosStatic = axios;

export default {
  get,
  post,
  postForm,
  del,
  put,
  patch,
  setInitConfig,
  axiosStatic
};
