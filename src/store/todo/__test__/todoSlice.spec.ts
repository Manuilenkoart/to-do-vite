import { EntityState } from '@reduxjs/toolkit';
import { describe, it } from 'vitest';

import { InitialAdapterState, Todo } from '@/api';
import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch } from '@/store';
import { responseRejected, todo } from '@/test';

import todoReducer, { initialState } from '../todoSlice';

const preloadState: EntityState<Todo> & InitialAdapterState = {
  ids: [todo.id],
  entities: { [todo.id]: todo },
  status: 'idle',
  currentIds: [],
  error: '',
};

describe('todoSlice', () => {
  it('should return the initial state', () => {
    expect(todoReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should change state status with pending', () => {
    const action = {
      type: getTodosFetch.pending.type,
      meta: {
        requestStatus: 'pending',
        requestId: 'requestId',
        arg: todo,
      },
    };
    const { ids, entities, status, currentIds, error } = todoReducer(initialState, action);

    expect(ids).toEqual([]);
    expect(entities).toEqual({});
    expect(status).toBe('pending');
    expect(currentIds).toEqual([todo.id]);
    expect(error).toBe('');
  });

  it('should change state status with rejected', () => {
    const action = {
      type: getTodosFetch.rejected.type,
      meta: {
        requestStatus: 'rejected',
        requestId: 'requestId',
      },
      payload: responseRejected.message,
    };
    const { ids, entities, status, currentIds, error } = todoReducer(initialState, action);

    expect(ids).toEqual([]);
    expect(entities).toEqual({});
    expect(status).toBe('rejected');
    expect(currentIds).toEqual([]);
    expect(error).toBe(responseRejected.message);
  });

  it('handle getTodosFetch.fulfilled', () => {
    const action = {
      type: getTodosFetch.fulfilled.type,
      payload: [todo],
    };
    const { ids, entities, status, currentIds, error } = todoReducer(initialState, action);

    expect(ids).toEqual([todo.id]);
    expect(entities).toEqual({ [todo.id]: todo });
    expect(status).toBe('idle');
    expect(currentIds).toEqual([]);
    expect(error).toBe('');
  });

  it('handle deleteTodoFetch.fulfilled', () => {
    const deleteTodoAction = {
      type: deleteTodoFetch.fulfilled.type,
      payload: todo,
    };
    const { ids, entities, status, currentIds, error } = todoReducer(preloadState, deleteTodoAction);

    expect(ids).toEqual([]);
    expect(entities).toEqual({});
    expect(status).toBe('idle');
    expect(currentIds).toEqual([]);
    expect(error).toBe('');
  });

  it('handle addTodoFetch.fulfilled', () => {
    const addTodoAction = {
      type: addTodoFetch.fulfilled.type,
      payload: todo,
    };
    const { ids, entities, status, currentIds, error } = todoReducer(initialState, addTodoAction);

    expect(ids).toEqual([todo.id]);
    expect(entities).toEqual({ [todo.id]: todo });
    expect(status).toBe('idle');
    expect(currentIds).toEqual([]);
    expect(error).toBe('');
  });

  it('handle updateTodoFetch.fulfilled', () => {
    const updatedTodo = {
      id: todo.id,
      title: 'updatedTitle',
      text: 'updatedText',
    };
    const updateTodoAction = {
      type: updateTodoFetch.fulfilled.type,
      payload: updatedTodo,
    };
    const { ids, entities, status, currentIds, error } = todoReducer(preloadState, updateTodoAction);

    expect(ids).toEqual([updatedTodo.id]);
    expect(entities).toEqual({ [updatedTodo.id]: updatedTodo });
    expect(status).toBe('idle');
    expect(currentIds).toEqual([]);
    expect(error).toBe('');
  });
});
