import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Leferi Point Type - White (제목/강조용) */
  @font-face {
    font-family: "Leferi Point Type";
    src: url("/fonts/LeferiPointWhite.ttf") format("truetype");
    font-style: normal;
    font-display: swap;
  }

  /* Leferi Base Type - Regular (본문/캡션용) */
  @font-face {
    font-family: "Leferi Base Type";
    src: url("/fonts/LeferiBaseRegular.ttf") format("truetype");
    font-style: normal;
    font-display: swap;
  }

  /* ============ Reset & Base ============ */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: "Leferi Base Type", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }
`;

export default GlobalStyle;
