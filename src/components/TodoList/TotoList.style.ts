import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: start;
`;

export const TodoCard = styled.div`
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

export const TodoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const TodoCardTitle = styled.div`
  font-weight: 900;
`;

export const TodoCardIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const TodoCardBody = styled.div`
  text-align: left;
`;

export const TodoCardEdit = styled(EditOutlined)`
  &:hover {
    color: #248f6c;
  }
`;

export const TodoCardDelete = styled(DeleteOutlined)`
  &:hover {
    color: #ff2d55;
  }
`;
