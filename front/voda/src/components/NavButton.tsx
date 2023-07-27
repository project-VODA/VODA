// components/Button.tsx

import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
}

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// 테마(모드) 별로 색상 고려해줘야됌!!
const SquareButton = styled(Link)<ThemeProps>`
  width: 50vh;
  height: 30vh;
  border-radius: 10px;
  font-size: 200px;
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

export interface NavButtonProps {
  text: string;
  to: string;
}

export default function Register({ text, to }: NavButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <SquareButton to={to} theme={theme}>
        {text}
      </SquareButton>
    </>
  );
}