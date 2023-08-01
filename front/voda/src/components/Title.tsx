// components/Title.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';

interface ColorProps {
  color: string;
  'aria-label'?: string;
}

const TitleContainer = styled('header')<ColorProps>`
  width: 100%;
  height: 60px;
  font-size: 2em;
  color: ${({ color }) => color};
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

interface TitleProps {
  title: string;
  'aria-label'?: string;
}

export default function Title({ title, 'aria-label':ariaLabel }: TitleProps) {
  const { theme } = useContext(ThemeContext);

  return <TitleContainer aria-label={ariaLabel} color={theme.text}>{title}</TitleContainer>;
}