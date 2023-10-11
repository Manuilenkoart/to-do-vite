import API_PATH from './apiPath';
import { deleteData, getData, postData, putData } from './crudHandlers';
import { NewTodo, Todo } from './types';

const API_HANDLERS = {
  Todo: {
    All: {
      Get: () => getData<Todo[]>(API_PATH.todo._),
    },
    Create: {
      Post: (data: NewTodo) => postData<Todo>(API_PATH.todo._, { data }),
    },
    Update: {
      Put: (data: Todo) => putData<Todo>(API_PATH.todo._, { data }),
    },
    Delete: {
      Delete: (id: Todo['id']) => deleteData<Todo>(API_PATH.todo._, { data: { id } }),
    },
  },
};

export default API_HANDLERS;
