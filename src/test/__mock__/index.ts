import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { NewTodo, Todo } from '@/api';

export const initialTodo: Todo = {
  id: '',
  title: '',
  text: '',
} as const;

export const newToto: NewTodo = {
  title: 'title',
  text: 'text',
};

export const todo: Todo = {
  id: '1',
  title: 'title',
  text: 'text',
};

export const responseRejected = {
  message: 'Server error',
};

export const responseResolved = <T, D>(data: T): AxiosResponse<T, D> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as InternalAxiosRequestConfig<D>,
});
