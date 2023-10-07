import reactLogo from '@assets/react.svg';
import { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  filter: drop-shadow(0 0 2em #61dafbaa);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} infinite 20s linear;
  }
`;

function Loader(): ReactElement {
  return <Logo src={reactLogo} alt="React logo" />;
}

export default Loader;
