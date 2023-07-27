// components/Button.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
}

const DeleteButton = styled('button')<ThemeProps>`
  width: 150px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
  padding: 8px;
  margin: 8px;
  background: #ff0000;
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
}

export default function Register({ text, onClick }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <DeleteButton theme={theme} onClick={onClick}>{text}</DeleteButton>
    </>
  );
}