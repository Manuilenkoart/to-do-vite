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
