// components/Input.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  
`;

// 테마(모드) 별로 색상 고려해줘야됌!!
const InputField = styled.span`
  width: 58%;
  height: 30px;
  font-size: 16px;
  margin: 4px;
  margin-bottom: 12px;
  font-weight: bolder;
  text-align: center;
  
  &:hover {
    font-size: 150%;
    transition: all 0.1s ease-in-out;
  }
`;

interface InputProps {
    text: string;
    onClick: (event: any) => void;
}

export default function Info({ text, onClick }: InputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TextContainer>
      <InputField theme={theme} onClick={onClick}>
        {text}
      </InputField>
    </TextContainer>
  )
};