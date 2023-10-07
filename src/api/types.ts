import { AxiosResponse } from 'axios';

export type AxiosResponseSuccess<Data> = Promise<AxiosResponse<Data>>;

export type RequestStatus = 'pending' | 'fulfilled' | 'rejected' | 'uninitialized';

export type Todo = {
  id: string;
  title: string;
  text: string;
};

export type NewTodo = Omit<Todo, 'id'>;

export type TodoState = {
  status: RequestStatus;
  todos: Todo[];
  error: string;
};
