import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: start;
`;

export const Card = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 20px 29px -14px;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const Title = styled.h3`
  font-weight: 900;
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Body = styled.p`
  text-align: left;
`;

export const EditIcon = styled(EditOutlined)`
  &:hover {
    color: #248f6c;
  }
`;

export const DeleteIcon = styled(DeleteOutlined)`
  &:hover {
    color: #ff2d55;
  }
`;

export const WrapperLineLoader = styled.div`
  width: inherit;
  position: absolute;
  top: 8px;
`;
