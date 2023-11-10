import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
export const WrapperIcons = styled.div`
  span {
    &:nth-child(1) {
      position: relative;
      top: -16px;
      left: -40px;
      transform: rotate(35deg);
    }

    &:nth-child(3) {
      position: relative;
      top: -16px;
      left: 40px;
      transform: rotate(-35deg);
    }
  }
`;
