import { combineReducers, configureStore } from '@reduxjs/toolkit';

import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  todoState: todoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
