/* eslint-disable no-param-reassign */
import { AnyAction, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { TodoState } from '@/api';

import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch } from './todoActionCreators';

const initialState = {
  status: 'uninitialized',
  todos: [],
  error: '',
} as TodoState;

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: ({ addCase, addMatcher }) => {
    addCase(getTodosFetch.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    addCase(deleteTodoFetch.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    });
    addCase(addTodoFetch.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    addCase(updateTodoFetch.fulfilled, (state, action) => {
      state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? { ...action.payload } : todo));
    });

    addMatcher(isPending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    addMatcher(isFulfilled, (state) => {
      state.status = 'fulfilled';
      state.error = '';
    });
    addMatcher(isRejected, (state, action: AnyAction) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

const todoReducer = todoSlice.reducer;

export default todoReducer;
