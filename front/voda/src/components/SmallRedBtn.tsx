// components/Button.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
}

const SmallRedButton = styled('button')<ThemeProps>`
  width: 60px;
  height: 40px;
  border-radius: 15px;
  font-size: 18px;
  padding: 8px;
  margin: 8px;
  border: 1px solid ${({ theme }) => theme.text};
  background: #FF0000;
  color: ${({ theme }) =>
    theme === SimpleTheme ? '#ffffff' : '#003566'};

  &:hover {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#FFD60A' : '#003566'};
    transition: all 0.1s ease-in-out;
  }
`;


export interface ButtonProps {
  text: string;
  onClick: (event: any) => void;
  'aria-label'?: string
  id? : string;
}

export default function Setting({ text, onClick, "aria-label":ariaLabel, id }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <SmallRedButton theme={theme} onClick={onClick} aria-label={ariaLabel} id={id}>{text}</SmallRedButton>
    </>
  );
}