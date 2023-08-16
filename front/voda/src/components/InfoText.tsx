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
`;

interface InputProps {
    text: string;
}

export default function Info({ text }: InputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TextContainer>
      <InputField theme={theme}>
        {text}
      </InputField>
    </TextContainer>
  )
};