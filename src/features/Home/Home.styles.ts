import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 1.5em;
`;

export const AddBtn = styled.button`
  background-color: #ffa800;
`;

export const Logo = styled.img`
  height: 6em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;
