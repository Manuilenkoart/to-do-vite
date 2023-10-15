import { EntityId } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { store } from '@/store';

export type AxiosResponseSuccess<Data> = Promise<AxiosResponse<Data>>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RequestStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type Todo = {
  id: string;
  title: string;
  text: string;
};

export type NewTodo = Omit<Todo, 'id'>;

export type InitialAdapterState = {
  status: RequestStatus;
  currentIds: EntityId[];
  error: string;
};
