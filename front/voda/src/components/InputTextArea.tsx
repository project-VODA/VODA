import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface ThemeProps {
  theme: Theme;
}

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// 테마(모드) 별로 색상 고려해줘야됌!!
const InputField = styled.textarea<ThemeProps>`
  width: 58%;
  height: 300px;
  border-radius: 20px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};

  text-align: center;

  &::placeholder {
    text-align: center;
  }

  resize: none

`;

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}


export default function Input({ placeholder, value, onChange }: InputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TextContainer>
      <InputField
        placeholder={placeholder}
        theme={theme}
        value={value}
        onChange={onChange}
      />
    </TextContainer>
  )
};