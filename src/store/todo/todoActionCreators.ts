import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_HANDLERS, NewTodo, Todo } from '@/api';

const handleCommonError = (error: AxiosError<{ error: string }>): string => {
  const message = error.response?.data?.error || error.message;
  return message;
};
export const todoThunkActionType = {
  getAll: 'todos/getTodosFetch',
  delete: 'todos/deleteTodoFetch',
  add: 'todos/addTodoFetch',
  update: 'todos/updateTodoFetch',
} as const;

export const getTodosFetch = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
  todoThunkActionType.getAll,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API_HANDLERS.Todo.All.Get();

      return data;
    } catch (error) {
      const message = handleCommonError(error as AxiosError<{ error: string }>);

      return rejectWithValue(message);
    }
  }
);

export const deleteTodoFetch = createAsyncThunk<Todo, Todo['id'], { rejectValue: string }>(
  todoThunkActionType.delete,
  async (id: Todo['id'], { rejectWithValue }) => {
    try {
      const { data } = await API_HANDLERS.Todo.Delete.Delete(id);

      return data;
    } catch (error) {
      const message = handleCommonError(error as AxiosError<{ error: string }>);

      return rejectWithValue(message);
    }
  }
);

export const addTodoFetch = createAsyncThunk<Todo, NewTodo, { rejectValue: string }>(
  todoThunkActionType.add,
  async (todo: NewTodo, { rejectWithValue }) => {
    try {
      const { data } = await API_HANDLERS.Todo.Create.Post(todo);

      return data;
    } catch (error) {
      const message = handleCommonError(error as AxiosError<{ error: string }>);

      return rejectWithValue(message);
    }
  }
);

export const updateTodoFetch = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
  todoThunkActionType.update,
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const { data } = await API_HANDLERS.Todo.Update.Put(todo);

      return data;
    } catch (error) {
      const message = handleCommonError(error as AxiosError<{ error: string }>);

      return rejectWithValue(message);
    }
  }
);
