import { AxiosResponse } from 'axios';

export type AxiosResponseSuccess<Data> = Promise<AxiosResponse<Data>>;

export type Todo = {
  id: string;
  title: string;
  text: string;
};

export type NewTodo = Omit<Todo, 'id'>;
