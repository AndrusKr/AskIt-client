import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    height: 100vh;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  #root, svg, input, h6, .header, .switch-modes-helper {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear !important;
  }

  #switch-modes-helper, .switch-modes-helper, .switch-modes-helper > * {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
    transition: all 0.25s linear !important;
  }
  `;
