import { describe, it } from 'vitest';

import { store } from '@/store/store';
import { todo } from '@/test/__mock__';

import todoReducer, { initialState } from '../todoSlice';

describe('todoSlice', () => {
  it('should return the initial state', () => {
    expect(todoReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle a todo being added to an empty list', () => {});
  it('handles getTodosFetch.fulfilled correctly', async () => {
    store.dispatch({
      type: 'todos/getTodosFetch/fulfilled',
      payload: [todo],
    });

    const state = store.getState().todoState;

    expect(state.status).toBe('idle');
    expect(state.error).toBe('');
    expect(state.currentIds).toEqual([]);
    expect(state.ids).toEqual([todo.id]);
    expect(state.entities).toEqual({
      [todo.id]: todo,
    });
  });
});
