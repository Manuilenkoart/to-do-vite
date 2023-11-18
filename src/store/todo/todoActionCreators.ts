import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { API_HANDLERS, NewTodo, Todo } from '@/api';

const handleCommonError = (error: AxiosError<{ error: string }>): string => {
  const message = error.response?.data?.error || error.message;
  return message;
};
export const todoThunkActionType = {
  getAll: 'todos/getTodosFetch',
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
  'todos/deleteTodoFetch',
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
  'todos/addTodoFetch',
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
  'todos/updateTodoFetch',
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
