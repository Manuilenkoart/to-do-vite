import styled, { keyframes } from 'styled-components';

const eyesAnimation = keyframes`
  0% {
    transform: scaleY(1);
  }
  3% {
    transform: scaleY(.1);
  }
  6% {
    transform: scaleY(1);
  }

  20% {
    transform: scaleY(1);
  }
  23% {
    transform: scaleY(.1);
  }
  26% {
    transform: scaleY(1);
  }

  40% {
    transform: scaleY(1);
  }
  43% {
    transform: scaleY(.1);
  }
  46% {
    transform: scaleY(1);
  }
  49% {
    transform: scaleY(.1);
  }
  51% {
    transform: scaleY(1);
  }

  60% {
    transform: translate(0,0);
  }
  61% {
    transform: translate(-8px,0);
  }
  70% {
    transform: translate(-8px,0);
  }
  71% {
    transform: translate(0,0)
  }
  80% {
    transform: translate(0,0)
  }
  81% {
    transform: translate(8px,0);
  }
  90% {
    transform: translate(8px,0);
  }
  91% {
    transform: translate(0,0)
  }
`;

const eye = styled.div`
  position: absolute;
  top: 20px;
  width: 8px;
  height: 30px;
  background-color: #213547;
  cursor: pointer;

  animation-name: ${eyesAnimation};
  animation-duration: 5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  animation-delay: 1s;

  &:hover {
    animation-play-state: paused;
  }
`;

export const EyeLeft = styled(eye)`
  left: 30px;
`;
export const EyeRight = styled(eye)`
  right: 30px;
`;

export const Mouth = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 40px;
  height: 2px;
  background-color: #213547;
`;

export const Face = styled.div.attrs({ 'aria-label': 'animated-face' })`
  position: relative;
  width: 100px;
  height: 100px;
  border: 4px solid #213547;
  border-radius: 50%;
`;
