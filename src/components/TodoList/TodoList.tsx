import { ReactElement } from 'react';

import { Todo, TodoState } from '@/api';

import * as S from './TotoList.style';

interface TodoListProps {
  todoState: TodoState;
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({ todoState: { todos }, onUpdateClick, onDeleteClick }: TodoListProps): ReactElement {
  return (
    <S.Container>
      {todos.map(({ id, title, text }) => (
        <S.TodoCard key={id}>
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
