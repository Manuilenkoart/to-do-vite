import { memo, ReactElement } from 'react';

import { Todo } from '@/api';

import { withTodoCard } from '../../hoc';
import { TodoCard } from '../TodoCard';
import * as S from './TotoList.styled';

interface TodoListProps {
  todos: Todo[];
  emptyView: ReactElement;
}

const TodoCardHOC = withTodoCard(TodoCard);

function TodoList({ todos, emptyView }: TodoListProps) {
  return (
    <>
      <S.Section data-testid="TodoList">
        {todos.map((todo) => (
          <TodoCardHOC key={todo.id} todo={todo} />
        ))}
      </S.Section>
      {todos.length ? null : emptyView}
    </>
  );
}

export default memo(TodoList);
