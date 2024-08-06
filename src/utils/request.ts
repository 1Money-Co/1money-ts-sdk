import Request from 'ajax-maker';

import type { InitConfig, Options } from 'ajax-maker';

const { request, setting } = new Request({
  isSuccess: (res, status) => status === 200 && res.code === 0,
  isLogin: (res, status) => status === 401 || res.code === 401,
  timeout: 10000
});

export function get<T>(
  url: string,
  options?: Omit<Options<T>, 'baseUrl' | 'method' | 'url'>
) {
  return request<T>({
    ...options,
    baseURL: location.origin,
    method: 'get',
    url
  });
}

export function post<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'baseUrl' | 'method' | 'url' | 'data'>
) {
  return request<T>({
    ...options,
    baseURL: location.origin,
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
  options?: Omit<Options<T>, 'baseUrl' | 'method' | 'url' | 'data'>
) {
  return request<T>({
    ...options,
    baseURL: location.origin,
    method: 'post',
    url,
    data
  });
}

export function put<T>(
  url: string,
  data: Record<string, any>,
  options?: Omit<Options<T>, 'baseUrl' | 'method' | 'url' | 'data'>
) {
  return request<T>({
    ...options,
    baseURL: location.origin,
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
  options?: Omit<Options<T>, 'baseUrl' | 'method' | 'url' | 'data'>
) {
  return request<T>({
    ...options,
    baseURL: location.origin,
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
  options?: Omit<Options<T>, 'baseUrl' | 'method' | 'url' | 'data'>
) {
  return request<T>({
    ...options,
    baseURL: location.origin,
    method: 'delete',
    url,
    data,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json'
    }
  });
}

export function setInitConfig(config: InitConfig) {
  setting(config);
}