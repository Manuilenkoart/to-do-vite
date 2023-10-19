import reactLogo from '@assets/react.svg';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.img.attrs({ src: reactLogo, alt: 'React Logo' })`
  height: 6em;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} infinite 1s linear;
  }
`;

export default Loader;
