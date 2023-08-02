// components/Input.tsx

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
const InputField = styled.input<ThemeProps>`
  width: 58%;
  height: 40px;
  border-radius: 20px;
  font-size: 20px;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  max-width: 450px;

  text-align: center;

  &::placeholder {
    text-align: center;
  }
`;

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  alt?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
}


export default function Input({ type, placeholder, value, onChange, onKeyPress, 'aria-label':ariaLabel}: InputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TextContainer>
      <InputField
        type={type}
        placeholder={placeholder}
        theme={theme}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        aria-label={ariaLabel}
      />
    </TextContainer>
  )
};