import { combineReducers, configureStore } from '@reduxjs/toolkit';

import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  todoState: todoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
