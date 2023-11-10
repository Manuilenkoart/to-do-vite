import { combineReducers, configureStore } from '@reduxjs/toolkit';

import todoReducer from './todo/todoSlice';

const rootReducer = combineReducers({
  todoState: todoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
