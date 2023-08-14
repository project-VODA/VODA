// HandleBtn.tsx
// NavButton 스타일 따옴

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { SimpleTheme, Theme } from '../../styles/theme';

interface ThemeProps {
  theme: Theme;
}

const WriteButton = styled.button<ThemeProps>`
  width: 110vh;
  height: 8vh;
  border-radius: 10px;
  font-size: 20px;
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
  'aria-label'?: string;
  tabIndex?: number;
}

export default function Button({ onClick, text, "aria-label":ariaLabel }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <WriteButton onClick={onClick} theme={theme} aria-label={ariaLabel}>
        {text}
      </WriteButton>
    </>
  );
}