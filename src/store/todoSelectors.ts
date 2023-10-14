import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/api';

import { todosAdapter } from './todoSlice';

const todoState = (state: RootState) => state.todoState;

export const {
  selectById: todosByIdSelector,
  selectIds: todosIdsSelector,
  selectEntities: todosEntitiesSelector,
  selectAll: todosSelector,
  selectTotal: todosTotalSelector,
} = todosAdapter.getSelectors(todoState);

export const todosStatusSelector = createSelector(todoState, (state) => state.status);
export const todosErrorSelector = createSelector(todoState, (state) => state.error);
export const todosCurrentIdsSelector = createSelector(todoState, (state) => state.currentIds);
