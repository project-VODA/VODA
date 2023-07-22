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
`;

// 테마(모드) 별로 색상 고려해줘야됌!!
const RegisterButton = styled('button')<ThemeProps>`
  width: 60%;
  height: 40px;
  border-radius: 20px;
  font-size: 20px;
  border: 1px solid #FFC300;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  margin-bottom: 16px;

  &:hover {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#FFD60A' : '#003566'};
    transition: all 0.1s ease-in-out;
  }
`;

//// hover - color
// color: ${({ theme }) =>
// theme === SimpleTheme ? theme.mainColor : theme.body};


export default function Register() {
  const { theme } = useContext(ThemeContext);

  return (
    <ButtonContainer>
      <RegisterButton theme={theme}>회원가입</RegisterButton>
    </ButtonContainer>
  );
}