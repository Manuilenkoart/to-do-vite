import { AxiosRequestConfig } from 'axios';

import { makeHttpRequest } from './httpClient';

export function getData<SuccessPayload>(url: string, config?: AxiosRequestConfig) {
  return makeHttpRequest<SuccessPayload>({ url, method: 'GET', ...config });
}

export function postData<SuccessPayload>(url: string, config?: AxiosRequestConfig) {
  return makeHttpRequest<SuccessPayload>({ url, method: 'POST', ...config });
}

export function putData<SuccessPayload>(url: string, config?: AxiosRequestConfig) {
  return makeHttpRequest<SuccessPayload>({ url, method: 'PUT', ...config });
}

export function patchData<SuccessPayload>(url: string, config?: AxiosRequestConfig) {
  return makeHttpRequest<SuccessPayload>({ url, method: 'PATCH', ...config });
}

export function deleteData<SuccessPayload>(url: string, config?: AxiosRequestConfig) {
  return makeHttpRequest<SuccessPayload>({ url, method: 'DELETE', ...config });
}
