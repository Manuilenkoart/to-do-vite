import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { Todo, TodoState } from '@/api';

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: start;
`;
const TodoCard = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
`;
const TodoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
const TodoCardTitle = styled.div`
  font-weight: 900;
`;
const TodoCardIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const TodoCardBody = styled.div`
  text-align: left;
`;
const TodoCardEdit = styled(EditOutlined)`
  &:hover {
    color: #248f6c;
  }
`;
const TodoCardDelete = styled(DeleteOutlined)`
  &:hover {
    color: #ff2d55;
  }
`;

interface TodoListProps {
  todoState: TodoState;
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoList({ todoState: { todos }, onUpdateClick, onDeleteClick }: TodoListProps): ReactElement {
  return (
    <Container>
      {todos.map(({ id, title, text }) => (
        <TodoCard key={id}>
          <TodoCardHeader>
            <TodoCardTitle>{title}</TodoCardTitle>
            <TodoCardIcons>
              <TodoCardEdit onClick={() => onUpdateClick({ id, title, text })} />
              <TodoCardDelete onClick={() => onDeleteClick(id)} />
            </TodoCardIcons>
          </TodoCardHeader>
          <TodoCardBody> {text}</TodoCardBody>
        </TodoCard>
      ))}
    </Container>
  );
}

export default TodoList;
