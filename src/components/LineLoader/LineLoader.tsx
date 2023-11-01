import styled, { keyframes } from 'styled-components';

const lineAnim = keyframes`
    0% {
        left: -40%;
    }
    50% {
        left: 20%;
        width: 80%;
    }
    100% {
        left: 100%;
        width: 100%;
    }
    `;

interface LineLoaderProps {
  'data-testid'?: string;
}

const LineLoader = styled.div.attrs<LineLoaderProps>({ 'data-testid': 'line-loader' })`
  height: 3px;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
  border-radius: 16px;

  &:before {
    content: '';
    position: absolute;
    left: -50%;
    height: 3px;
    width: 40%;
    background-color: #61dafbaa;
    animation: ${lineAnim} 1s linear infinite;
    border-radius: 16px;
  }
`;

export default LineLoader;
