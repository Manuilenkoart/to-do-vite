export type Todo = {
  id: string;
  title: string;
  text: string;
};

export type NewTodo = Omit<Todo, 'id'>;
