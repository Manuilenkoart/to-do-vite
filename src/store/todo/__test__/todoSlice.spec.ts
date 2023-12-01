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
  it('should change state status with pending', () => {
    const action = {
      type: '/pending',
      payload: undefined,
      meta: {
        requestStatus: 'pending',
        requestId: 'requestId',
        arg: todo,
      },
    };
    const state = todoReducer(initialState, action);

    expect(state).toEqual(expect.objectContaining({ ...state, status: 'pending' }));
  });

  it('should change state status with fulfilled', () => {
    const action = {
      type: '/fulfilled',
      payload: todo,
      meta: {
        requestStatus: 'fulfilled',
        requestId: 'requestId',
        arg: todo,
      },
    };
    const state = todoReducer(initialState, action);

    expect(state).toEqual(expect.objectContaining({ ...state, status: 'fulfilled' }));
  });

  it('should change state status with rejected', () => {
    const action = {
      type: '/rejected',
      payload: responseRejected.message,
      meta: {
        requestStatus: 'rejected',
        requestId: 'requestId',
        arg: todo,
      },
    };
    const state = todoReducer(initialState, action);

    expect(state).toEqual(expect.objectContaining({ ...state, status: 'rejected' }));
  });

  it('handle getTodosFetch.fulfilled', () => {
    const action = {
      type: getTodosFetch.fulfilled.type,
      payload: [todo],
    };
    const state = todoReducer(initialState, action);

    expect(state).toEqual(
      expect.objectContaining({
        ids: [todo.id],
        entities: { [todo.id]: todo },
        status: 'idle',
        currentIds: [],
        error: '',
      })
    );
  });

  it('handle deleteTodoFetch.fulfilled', () => {
    const deleteTodoAction = {
      type: deleteTodoFetch.fulfilled.type,
      payload: todo,
    };
    const state = todoReducer(preloadState, deleteTodoAction);

    expect(state).toEqual(
      expect.objectContaining({
        ids: [],
        entities: {},
        status: 'idle',
        currentIds: [],
        error: '',
      })
    );
  });

  it('handle addTodoFetch.fulfilled', () => {
    const addTodoAction = {
      type: addTodoFetch.fulfilled.type,
      payload: todo,
    };
    const state = todoReducer(initialState, addTodoAction);

    expect(state).toEqual(
      expect.objectContaining({
        ids: [todo.id],
        entities: { [todo.id]: todo },
        status: 'idle',
        currentIds: [],
        error: '',
      })
    );
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
    const state = todoReducer(preloadState, updateTodoAction);

    expect(state).toEqual(
      expect.objectContaining({
        ids: [updatedTodo.id],
        entities: { [updatedTodo.id]: updatedTodo },
        status: 'idle',
        currentIds: [],
        error: '',
      })
    );
  });
});
