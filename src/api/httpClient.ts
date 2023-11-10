import axios, { AxiosRequestConfig } from 'axios';

import { AxiosResponseSuccess } from './types';

function createHttpClient() {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
const httpClient = createHttpClient();

export async function makeHttpRequest<SuccessPayload>(
  config: AxiosRequestConfig
): AxiosResponseSuccess<SuccessPayload> {
  const { headers } = config;
  const headersToSend = { ...headers };

  return httpClient.request<SuccessPayload>({ ...config, headers: headersToSend });
}
