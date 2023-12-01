import { vi } from 'vitest';

import { API_HANDLERS } from '@/api';
import { newToto, responseRejected, responseResolved, todo } from '@/test';

import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch } from '../todoActionCreators';

describe('todoActionCreators', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('getTodosFetch', () => {
    const spyTodoAllGet = vi.spyOn(API_HANDLERS.Todo.All, 'Get');

    it('resolved', async () => {
      const mockTodoResponse = [todo];
      spyTodoAllGet.mockResolvedValue(responseResolved(mockTodoResponse));
      const dispatch = vi.fn();

      await getTodosFetch()(
        dispatch,
        () => {},
        () => {}
      );

      const [_, fulfilled] = dispatch.mock.calls;

      expect(spyTodoAllGet).toHaveBeenCalledTimes(1);
      expect(fulfilled[0].payload).toEqual(mockTodoResponse);
      expect(fulfilled[0].meta.rejectedWithValue).not.toBe(true);
    });

    it('rejected', async () => {
      spyTodoAllGet.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await getTodosFetch()(
        dispatch,
        () => {},
        () => {}
      );

      const [_, rejected] = dispatch.mock.calls;

      expect(spyTodoAllGet).toHaveBeenCalledTimes(1);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });

  describe('deleteTodoFetch', () => {
    const spyTodoDelete = vi.spyOn(API_HANDLERS.Todo.Delete, 'Delete');

    it('resolved', async () => {
      spyTodoDelete.mockResolvedValue(responseResolved(todo));
      const dispatch = vi.fn();

      await deleteTodoFetch(todo.id)(
        dispatch,
        () => {},
        () => {}
      );

      const [_, fulfilled] = dispatch.mock.calls;

      expect(spyTodoDelete).toHaveBeenCalledWith(todo.id);
      expect(fulfilled[0].payload).toEqual(todo);
      expect(fulfilled[0].meta.rejectedWithValue).not.toBe(true);
    });

    it('rejected', async () => {
      spyTodoDelete.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await deleteTodoFetch(todo.id)(
        dispatch,
        () => {},
        () => {}
      );

      const [_, rejected] = dispatch.mock.calls;

      expect(spyTodoDelete).toHaveBeenCalledWith(todo.id);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });

  describe('addTodoFetch', () => {
    const spyTodoAdd = vi.spyOn(API_HANDLERS.Todo.Create, 'Post');

    it('resolved', async () => {
      spyTodoAdd.mockResolvedValue(responseResolved(todo));
      const dispatch = vi.fn();

      await addTodoFetch(newToto)(
        dispatch,
        () => {},
        () => {}
      );

      const [_, fulfilled] = dispatch.mock.calls;

      expect(spyTodoAdd).toHaveBeenCalledWith(newToto);
      expect(fulfilled[0].payload).toEqual(todo);
      expect(fulfilled[0].meta.rejectedWithValue).not.toBe(true);
    });

    it('rejected', async () => {
      spyTodoAdd.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await addTodoFetch(newToto)(
        dispatch,
        () => {},
        () => {}
      );

      const [_, rejected] = dispatch.mock.calls;

      expect(spyTodoAdd).toHaveBeenCalledWith(newToto);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });

  describe('updateTodoFetch', () => {
    const spyTodoUpdate = vi.spyOn(API_HANDLERS.Todo.Update, 'Put');

    it('resolved', async () => {
      spyTodoUpdate.mockResolvedValue(responseResolved(todo));
      const dispatch = vi.fn();

      await updateTodoFetch(todo)(
        dispatch,
        () => {},
        () => {}
      );

      const [_, fulfilled] = dispatch.mock.calls;

      expect(spyTodoUpdate).toHaveBeenCalledWith(todo);
      expect(fulfilled[0].payload).toEqual(todo);
      expect(fulfilled[0].meta.rejectedWithValue).not.toBe(true);
    });

    it('rejected', async () => {
      spyTodoUpdate.mockRejectedValue(responseRejected);
      const dispatch = vi.fn();

      await updateTodoFetch(todo)(
        dispatch,
        () => {},
        () => {}
      );

      const [_, rejected] = dispatch.mock.calls;

      expect(spyTodoUpdate).toHaveBeenCalledWith(todo);
      expect(rejected[0].payload).toBe(responseRejected.message);
      expect(rejected[0].meta.rejectedWithValue).toBe(true);
    });
  });
});
