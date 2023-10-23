import { EntityId } from '@reduxjs/toolkit';
import { memo, ReactNode } from 'react';

import { Todo } from '@/api';

import { TodoCard } from '../TodoCard';
import * as S from './TotoList.style';

interface TodoListProps {
  todos: Todo[];
  todoCurrentIds: EntityId[];
  emptyView: ReactNode | null;
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({ onUpdateClick, onDeleteClick, todos, todoCurrentIds, emptyView }: TodoListProps) {
  return (
    <S.Container>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          isLoading={todoCurrentIds.includes(todo.id)}
          todo={todo}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
      {emptyView}
    </S.Container>
  );
}

export default memo(TodoList);
