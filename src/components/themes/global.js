import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    height: 100vh;
    transition: all 0.25s linear;
  }
  
  .questions-titles {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  
  .header {
    background: ${({ theme }) => theme.body};
    transition: all 0.25s linear;
  }
  `;
