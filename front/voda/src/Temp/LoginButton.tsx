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
const LoginButton = styled('button')<ThemeProps>`
  width: 60%;
  height: 40px;
  border-radius: 20px;
  font-size: 20px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};

  &:hover {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#FFD60A' : '#003566'};
    transition: all 0.1s ease-in-out;
  }
`;

export default function Login() {
  const { theme } = useContext(ThemeContext);

  return (
    <ButtonContainer>
      <LoginButton theme={theme}>로그인</LoginButton>
    </ButtonContainer>
  );
}