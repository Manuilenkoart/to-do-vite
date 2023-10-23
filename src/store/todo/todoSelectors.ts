import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/api';

import { todosAdapter } from './todoSlice';

const todoState = (state: RootState) => state.todoState;

export const {
  selectById: selectByIdTodo,
  selectIds: selectIdsTodo,
  selectEntities: selectEntitiesTodo,
  selectAll: selectAllTodo,
  selectTotal: selectTotalTodo,
} = todosAdapter.getSelectors(todoState);

export const selectTodoStatus = createSelector(todoState, (state) => state.status);
export const selectTodoError = createSelector(todoState, (state) => state.error);
export const selectTodoCurrentIds = createSelector(todoState, (state) => state.currentIds);
