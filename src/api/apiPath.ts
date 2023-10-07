import { Todo } from './types';

const API_PATH = {
  todo: {
    _: `/api/todo`,

    byId: {
      _: ({ id }: Pick<Todo, 'id'>) => `/api/todo/${id}`,
    },
  },
};

export default API_PATH;
