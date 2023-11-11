import styled from 'styled-components';

export const Section = styled.section`
  position: absolute;
  width: 250px;
  top: 25%;
  left: calc(50% - 159px);
  padding: 16px 32px;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 40px 29px -14px;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
`;
export const Backdrop = styled.div.attrs({ 'aria-label': 'modal-backdrop' })`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(225, 241, 249, 0.15);
  backdrop-filter: blur(6px);
`;
