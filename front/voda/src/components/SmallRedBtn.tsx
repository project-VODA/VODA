import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
}

const SmallRedButton = styled('button')<ThemeProps>`
  width: 3vw;
  height: 40px;
  border-radius: 10px;
  font-size: 18px;
  padding: 8px;
  margin: 8px;
  border: 1px solid ${({ theme }) => theme.text};
  background: #f11818;
  border: none;
  color: ${({ theme }) =>
    theme === SimpleTheme ? '#ffffff' : '#ffffff'};

  &:hover {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#fe4242' : '#fe4242'};
    transition: all 0.1s ease-in-out;
  }
`;


export interface ButtonProps {
  text: string;
  onClick: (event: any) => void;
  'aria-label'?: string
  id? : string;
  tabIndex?: number;
  style?: React.CSSProperties;
}

export default function Setting({ text, onClick, "aria-label":ariaLabel, id, style }: ButtonProps ) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <SmallRedButton style={style} theme={theme} onClick={onClick} aria-label={ariaLabel} id={id}>{text}</SmallRedButton>
    </>
  );
}