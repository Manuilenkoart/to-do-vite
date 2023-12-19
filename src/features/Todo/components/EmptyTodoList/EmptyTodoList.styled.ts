import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
export const WrapperIcons = styled.div`
  span {
    position: relative;

    &:nth-child(1) {
      top: -32px;
      left: -40px;
      transform: rotate(35deg);
    }

    &:nth-child(2) {
      top: -16px;
    }

    &:nth-child(3) {
      top: -32px;
      left: 40px;
      transform: rotate(-35deg);
    }
  }
`;
