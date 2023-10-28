import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  #root {
    width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
    color: #213547;
  }

  body {
    margin: 0;
    display: flex;
    min-width: 320px;
    min-height: 100vh;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;

    &:hover {
      color: #535bf2;
    }
  }

  button, input, textarea {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 8px 12px;
    font-size: 16px;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;
    color: #213547;

    &:hover,
    &:focus,
    &:focus-visible {
      border-color: #646cff;
    }
  }

  input::placeholder, 
  textarea::placeholder {
    opacity: 0.5; 
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
`;

export default GlobalStyles;
