import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 16px 16px 16px;
`;

export const AddBtnWrapper = styled.div`
  text-align: center;
`;
export const AddBtn = styled.button`
  background-color: #ffa800;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 16px 12px -8px;
`;

export const LogoWrapper = styled.div`
  text-align: center;
`;
export const Logo = styled.img`
  height: 6em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 20px 8px #646cffaa);
  }
`;
