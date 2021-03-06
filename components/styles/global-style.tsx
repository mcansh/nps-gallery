import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
    text-size-adjust: 100%;
  }

  * {
    box-sizing: inherit;
    margin: 0;
  }

  body {
    font-family: ${props => props.theme.fontStack};
    font-weight: 400;
    background: #303030;
    color: white;
    letter-spacing: 0.4px;
  }

`;

export default GlobalStyle;
