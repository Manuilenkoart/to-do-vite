import { EntityId } from '@reduxjs/toolkit';
import { memo, ReactNode } from 'react';

import { Todo } from '@/api';
import { LineLoader } from '@/components';

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
      {todos.map(({ id, title, text }) => (
        <S.Card key={id}>
          {todoCurrentIds.includes(id) && (
            <S.WrapperLineLoader>
              <LineLoader />
            </S.WrapperLineLoader>
          )}
          <S.Header>
            <S.Title>{title}</S.Title>
            <S.IconsContainer>
              <S.EditIcon onClick={() => onUpdateClick({ id, title, text })} />
              <S.DeleteIcon onClick={() => onDeleteClick(id)} />
            </S.IconsContainer>
          </S.Header>
          <S.Body> {text}</S.Body>
        </S.Card>
      ))}
      {emptyView}
    </S.Container>
  );
}

export default memo(TodoList);