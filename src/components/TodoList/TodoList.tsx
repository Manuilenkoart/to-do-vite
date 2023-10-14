import { ArrowUpOutlined } from '@ant-design/icons';
import { memo, ReactElement } from 'react';

import { Todo } from '@/api';
import { selectAllTodo, selectTodoCurrentIds, selectTodoStatus, selectTotalTodo, useAppSelector } from '@/store';

import { LineLoader } from '../LineLoader';
import * as S from './TotoList.style';

interface TodoListProps {
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({ onUpdateClick, onDeleteClick }: TodoListProps): ReactElement {
  const todos = useAppSelector(selectAllTodo);
  const todosTotal = useAppSelector(selectTotalTodo);
  const todoStatus = useAppSelector(selectTodoStatus);
  const todoCurrentIds = useAppSelector(selectTodoCurrentIds);

  return (
    <S.Container>
      <>
        {todosTotal
          ? todos.map(({ id, title, text }) => (
              <S.TodoCard key={id}>
                {todoCurrentIds.includes(id) ? (
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
            ))
          : null}
        {!todosTotal && todoStatus === 'fulfilled' ? (
          <div>
            <S.WrapperIcons>
              <ArrowUpOutlined />
              <ArrowUpOutlined />
              <ArrowUpOutlined />
            </S.WrapperIcons>

            <h4>Does not have any todo</h4>
          </div>
        ) : null}
      </>
    </S.Container>
  );
}

export default memo(TodoList);
