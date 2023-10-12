import { ReactElement } from 'react';

import { Todo, TodoState } from '@/api';

import { LineLoader } from '../LineLoader';
import * as S from './TotoList.style';

interface TodoListProps {
  todoState: TodoState;
  todoPending: Todo;
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({
  todoState: { todos, status },
  todoPending,
  onUpdateClick,
  onDeleteClick,
}: TodoListProps): ReactElement {
  return (
    <S.Container>
      {todos.map(({ id, title, text }) => (
        <S.TodoCard key={id}>
          {todoPending.id === id && status === 'pending' ? (
            <S.WrapperLineLoader>
              <LineLoader />
            </S.WrapperLineLoader>
          ) : null}
          <S.TodoCardHeader>
            <S.TodoCardTitle>{title}</S.TodoCardTitle>
            <S.TodoCardIcons>
              <S.TodoCardEdit onClick={() => onUpdateClick({ id, title, text })} />
              <S.TodoCardDelete onClick={() => onDeleteClick(id)} />
            </S.TodoCardIcons>
          </S.TodoCardHeader>
          <S.TodoCardBody> {text}</S.TodoCardBody>
        </S.TodoCard>
      ))}
    </S.Container>
  );
}

export default TodoList;
