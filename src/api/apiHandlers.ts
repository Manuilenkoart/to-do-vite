import API_PATH from './apiPath';
import { deleteData, getData, postData, putData } from './crudHandlers';
import { AxiosResponseSuccess, NewTodo, Todo } from './types';

const API_HANDLERS = {
  Todo: {
    All: {
      Get(): AxiosResponseSuccess<Todo[]> {
        return getData(API_PATH.todo._);
      },
    },
    Create: {
      Post(data: NewTodo): AxiosResponseSuccess<Todo> {
        return postData(API_PATH.todo._, { data });
      },
    },
    Update: {
      Put(data: Todo): AxiosResponseSuccess<Todo> {
        return putData(API_PATH.todo._, { data });
      },
    },
    Delete: {
      Delete(id: Todo['id']): AxiosResponseSuccess<Todo> {
        return deleteData(API_PATH.todo._, { data: { id } });
      },
    },
  },
};

export default API_HANDLERS;
