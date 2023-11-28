import { AnyAction, EntityId } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { rootReducer, setupStore } from '@/store';

export type AxiosResponseSuccess<Data> = Promise<AxiosResponse<Data>>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

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

export interface Matcher extends AnyAction {
  meta: {
    requestStatus: RequestStatus;
    arg: { id?: string };
  };
}
export interface MatcherRejected extends Matcher {
  payload: string;
}
