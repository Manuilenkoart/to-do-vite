import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import { RootState } from '@/api';

import todoReducer from './todo/todoSlice';

export const rootReducer = combineReducers({
  todoState: todoReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });
