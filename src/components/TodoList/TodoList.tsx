import { ArrowUpOutlined } from '@ant-design/icons';
import { memo, ReactElement, useEffect, useState } from 'react';

import { Todo } from '@/api';
import { todosSelector, todosStatusSelector, useAppSelector } from '@/store';

import { LineLoader } from '../LineLoader';
import * as S from './TotoList.style';

interface TodoListProps {
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({ onUpdateClick, onDeleteClick }: TodoListProps): ReactElement {
  const todos = useAppSelector(todosSelector);
  const status = useAppSelector(todosStatusSelector);

  const [todoPending, setTodoPending] = useState<Todo['id'] | ''>('');

  useEffect(() => {
    if (status !== 'pending') {
      setTodoPending('');
    }
  }, [status]);

  return (
    <S.Container>
      <>
        {todos.length
          ? todos.map(({ id, title, text }) => (
              <S.TodoCard key={id}>
                {todoPending === id && status === 'pending' ? (
                  <S.WrapperLineLoader>
                    <LineLoader />
                  </S.WrapperLineLoader>
                ) : null}
                <S.TodoCardHeader>
                  <S.TodoCardTitle>{title}</S.TodoCardTitle>
                  <S.TodoCardIcons>
                    <S.TodoCardEdit
                      onClick={() => {
                        onUpdateClick({ id, title, text });
                        setTodoPending(id);
                      }}
                    />
                    <S.TodoCardDelete onClick={() => onDeleteClick(id)} />
                  </S.TodoCardIcons>
                </S.TodoCardHeader>
                <S.TodoCardBody> {text}</S.TodoCardBody>
              </S.TodoCard>
            ))
          : null}
        {!todos.length && status === 'fulfilled' ? (
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
