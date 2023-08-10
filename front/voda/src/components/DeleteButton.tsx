// components/Button.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
  'aria-label'?: string;
}

const DeleteButton = styled('button')<ThemeProps>`
  width: 8vw;
  height: 40px;
  border-radius: 15px;
  font-size: 1.3vw;
  padding: 8px;
  margin: 8px;
  background: #ff0000;
  border: none;
  color: ${({ theme }) =>
    theme === SimpleTheme ? '#ffffff' : '#003566'};

  &:hover {
    transition: all 0.1s ease-in-out;
  }
`;

// border: 1px solid ${({ theme }) =>
// theme === SimpleTheme ? '#ff0000' : '#003566'};


export interface ButtonProps {
  text: string;
  onClick: (event: any) => void;
  'aria-label'?: string;
  className? : string;
}

export default function Register({ text, onClick, "aria-label":ariaLabel, className }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <DeleteButton className='' theme={theme} onClick={onClick} aria-label={ariaLabel}>{text}</DeleteButton>
    </>
  );
}