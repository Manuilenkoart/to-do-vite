/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { InitialAdapterState, Matcher, MatcherRejected, Todo } from '@/api';

import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch } from './todoActionCreators';

export const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState<InitialAdapterState>({
  status: 'idle',
  currentIds: [],
  error: '',
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: ({ addCase, addMatcher }) => {
    addCase(getTodosFetch.fulfilled, (state, { payload }) => {
      todosAdapter.addMany(state, payload);
    });
    addCase(deleteTodoFetch.fulfilled, (state, { payload }) => {
      todosAdapter.removeOne(state, payload.id);
    });
    addCase(addTodoFetch.fulfilled, (state, { payload }) => {
      todosAdapter.addOne(state, payload);
    });
    addCase(updateTodoFetch.fulfilled, (state, { payload }) => {
      todosAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      });
    });

    addMatcher(isPending, (state, action) => {
      const {
        meta: { requestStatus, arg },
      } = action as Matcher;

      state.status = requestStatus;
      state.error = '';
      if (arg?.id) {
        state.currentIds.push(arg.id);
      }
    });
    addMatcher(isFulfilled, (state, action) => {
      const {
        meta: { requestStatus, arg },
      } = action as Matcher;

      state.status = requestStatus;
      state.error = '';
      if (arg?.id) {
        state.currentIds = state.currentIds.filter((id) => id !== arg.id);
      }
    });
    addMatcher(isRejected, (state, action) => {
      const {
        meta: { requestStatus, arg },
        payload,
      } = action as MatcherRejected;

      state.status = requestStatus;
      state.error = payload;
      if (arg?.id) {
        state.currentIds = state.currentIds.filter((id) => id !== arg.id);
      }
    });
  },
});

const todoReducer = todoSlice.reducer;

export default todoReducer;
