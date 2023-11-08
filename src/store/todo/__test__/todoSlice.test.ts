import { describe, it } from 'vitest';

import todoReducer, { initialState } from '../todoSlice';

describe('todoSlice', () => {
  it('should return the initial state', () => {
    expect(todoReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle a todo being added to an empty list', () => {});
});
