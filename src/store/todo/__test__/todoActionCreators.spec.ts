import { AxiosRequestHeaders } from 'axios';
import { vi } from 'vitest';

import { API_HANDLERS } from '@/api';
import { thunkStatus, todo } from '@/test/__mock__';

import { getTodosFetch, todoThunkActionType } from '../todoActionCreators';

const responseResolved = <T>(data: T) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
});

const responseRejected = {
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
});
