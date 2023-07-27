import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { SimpleTheme, Theme } from '../../styles/theme';


interface ThemeProps {
  theme: Theme;
}

// 테마(모드) 별로 색상 고려해줘야됌!!
const SquareButton = styled(Link)<ThemeProps>`
  width: 10vh;
  height: 10vh;
  border-radius: 10px;
  font-size: 16px;
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

export interface WriteButtonProps {
  text: string;
  to: string;
}

export default function WriteArticle({ text, to }: WriteButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <SquareButton to={to} theme={theme}>
        {text}
      </SquareButton>
    </>
  );
}