// components/Title.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';

interface ColorProps {
  color: string;
}

const TitleContainer = styled('header')<ColorProps>`
  width: 100%;
  height: 120px;
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
}

export default function Title({ title }: TitleProps) {
  const { theme } = useContext(ThemeContext);

  return <TitleContainer color={theme.text}>{title}</TitleContainer>;
}