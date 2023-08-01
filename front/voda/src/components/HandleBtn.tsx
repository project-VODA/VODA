// HandleBtn.tsx
// NavButton 스타일 따옴

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';

interface ThemeProps {
  theme: Theme;
}

const HandleButton = styled.button<ThemeProps>`
  width: 50vh;
  height: 30vh;
  border-radius: 10px;
  font-size: 50px;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};

  &:hover {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#FFD60A' : '#003566'};
    transition: all 0.1s ease-in-out;
  }
`;

export interface ButtonProps {
  onClick?: () => void;
  text: string;
  alt?: string;
  'aria-label'?: string;
}

export default function Button({ onClick, text, alt, 'aria-label':ariaLabel }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <HandleButton onClick={onClick} theme={theme} aria-label={ariaLabel}>
        {text}
      </HandleButton>
    </>
  );
}