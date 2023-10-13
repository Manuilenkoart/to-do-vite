import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

const todoState = (state: RootState) => state.todoState;

export const todosSelector = createSelector(todoState, (state) => state.todos);
export const todosStatusSelector = createSelector(todoState, (state) => state.status);
export const todosErrorSelector = createSelector(todoState, (state) => state.error);
