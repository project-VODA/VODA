// components/Button.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 테마(모드) 별로 색상 고려해줘야됌!!
const RegisterButton = styled('button')<ThemeProps>`
  width: 30vw;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  max-width: 467px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#FFD60A' : '#003566'};
    transition: all 0.1s ease-in-out;
  }
`;

//// hover - color
// color: ${({ theme }) =>
// theme === SimpleTheme ? theme.mainColor : theme.body};

export interface ButtonProps {
  text: string;
  onClick: (event: any) => void;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
}

export default function Register({ text, onClick, "aria-label":ariaLabel, style }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <ButtonContainer>
      <RegisterButton style={style} theme={theme} onClick={onClick} aria-label={ariaLabel}>{text}</RegisterButton>
    </ButtonContainer>
  );
}