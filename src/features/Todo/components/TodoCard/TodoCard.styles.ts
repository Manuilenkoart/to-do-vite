import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 20px 29px -14px;
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

const IconButton = styled.button`
  padding: 2px;
  background-color: transparent;
`;

export const EditButton = styled(IconButton)`
  &:hover {
    border: 1px solid #248f6c;
    color: #248f6c;
  }
`;

export const DeleteButton = styled(IconButton)`
  &:hover {
    border: 1px solid #ff2d55;
    color: #ff2d55;
  }
`;

export const WrapperLineLoader = styled.div`
  width: inherit;
  position: absolute;
  top: 8px;
`;
