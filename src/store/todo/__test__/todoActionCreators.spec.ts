import { AxiosRequestHeaders } from 'axios';
import { vi } from 'vitest';

import { API_HANDLERS } from '@/api';
import { newToto, thunkStatus, todo } from '@/test/__mock__';

import {
  addTodoFetch,
  deleteTodoFetch,
  getTodosFetch,
  todoThunkActionType,
  updateTodoFetch,
} from '../todoActionCreators';

export const responseResolved = <T>(data: T) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
});

export const responseRejected = {
  message: 'Server error',
};

describe('todoActionCreators', () => {
  describe('getTodosFetch', () => {
    const spyTodoAllGet = vi.spyOn(API_HANDLERS.Todo.All, 'Get');

    it('can be resolved', async () => {
      spyTodoAllGet.mockResolvedValue(responseResolved([todo]));
      const dispatch = vi.fn();

      await getTodosFetch()(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, fulfilled] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.getAll + thunkStatus.pending);
      expect(fulfilled[0].type).toBe(todoThunkActionType.getAll + thunkStatus.fulfilled);
      expect(fulfilled[0].payload).toEqual([todo]);
    });

    it('can be rejected', async () => {
      spyTodoAllGet.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await getTodosFetch()(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, rejected] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.getAll + thunkStatus.pending);
      expect(rejected[0].type).toBe(todoThunkActionType.getAll + thunkStatus.rejected);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });

  describe('deleteTodoFetch', () => {
    const spyTodoDelete = vi.spyOn(API_HANDLERS.Todo.Delete, 'Delete');

    it('can be resolved', async () => {
      spyTodoDelete.mockResolvedValue(responseResolved(todo));
      const dispatch = vi.fn();

      await deleteTodoFetch(todo.id)(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, fulfilled] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.delete + thunkStatus.pending);
      expect(fulfilled[0].type).toBe(todoThunkActionType.delete + thunkStatus.fulfilled);
      expect(fulfilled[0].payload).toEqual(todo);
    });

    it('can be rejected', async () => {
      spyTodoDelete.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await deleteTodoFetch(todo.id)(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, rejected] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.delete + thunkStatus.pending);
      expect(rejected[0].type).toBe(todoThunkActionType.delete + thunkStatus.rejected);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });

  describe('addTodoFetch', () => {
    const spyTodoAdd = vi.spyOn(API_HANDLERS.Todo.Create, 'Post');

    it('can be resolved', async () => {
      spyTodoAdd.mockResolvedValue(responseResolved(todo));
      const dispatch = vi.fn();

      await addTodoFetch(newToto)(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, fulfilled] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.add + thunkStatus.pending);
      expect(fulfilled[0].type).toBe(todoThunkActionType.add + thunkStatus.fulfilled);
      expect(fulfilled[0].payload).toEqual(todo);
    });

    it('can be rejected', async () => {
      spyTodoAdd.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await addTodoFetch(newToto)(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, rejected] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.add + thunkStatus.pending);
      expect(rejected[0].type).toBe(todoThunkActionType.add + thunkStatus.rejected);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });

  describe('updateTodoFetch', () => {
    const spyTodoUpdate = vi.spyOn(API_HANDLERS.Todo.Update, 'Put');

    it('can be resolved', async () => {
      spyTodoUpdate.mockResolvedValue(responseResolved(todo));
      const dispatch = vi.fn();

      await updateTodoFetch(todo)(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, fulfilled] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.update + thunkStatus.pending);
      expect(fulfilled[0].type).toBe(todoThunkActionType.update + thunkStatus.fulfilled);
      expect(fulfilled[0].payload).toEqual(todo);
    });

    it('can be rejected', async () => {
      spyTodoUpdate.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await updateTodoFetch(todo)(
        dispatch,
        () => {},
        () => {}
      );

      const [pending, rejected] = dispatch.mock.calls;

      expect(pending[0].type).toBe(todoThunkActionType.update + thunkStatus.pending);
      expect(rejected[0].type).toBe(todoThunkActionType.update + thunkStatus.rejected);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });
});
