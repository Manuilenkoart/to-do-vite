import { memo, ReactElement } from 'react';

import { Todo } from '@/api';

import { TodoCard } from '../TodoCard';
import * as S from './TotoList.styled';

interface TodoListProps {
  todos: Todo[];
  todoCurrentIds: string[];
  emptyView: ReactElement;
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo) => void;
}
function TodoList({ onUpdateClick, onDeleteClick, todos, todoCurrentIds, emptyView }: TodoListProps) {
  return (
    <>
      <S.Section data-testid="TodoList">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            isLoading={todoCurrentIds.includes(todo.id)}
            todo={todo}
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </S.Section>
      {todos.length ? null : emptyView}
    </>
  );
}

export default memo(TodoList);
