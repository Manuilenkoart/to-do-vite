import { ArrowUpOutlined } from '@ant-design/icons';
import { EntityId } from '@reduxjs/toolkit';
import { memo, ReactElement } from 'react';

import { RequestStatus, Todo } from '@/api';

import { LineLoader } from '../LineLoader';
import * as S from './TotoList.style';

interface TodoListProps {
  todos: Todo[];
  todosTotal: number;
  todoStatus: RequestStatus;
  todoCurrentIds: EntityId[];
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({
  onUpdateClick,
  onDeleteClick,
  todos,
  todosTotal,
  todoCurrentIds,
  todoStatus,
}: TodoListProps): ReactElement {
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
