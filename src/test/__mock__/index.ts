import { AxiosRequestHeaders } from 'axios';

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

export const responseResolved = <T>(data: T) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
});
