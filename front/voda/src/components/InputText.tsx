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
  width: 26vw;
  height: 6vh;
  border-radius: 20px;
  font-size: 1.25vw;
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  readonly?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  className?: string;
}


export default function Input({ type, placeholder, value, onChange, 'aria-label':ariaLabel, readonly, checked, style, tabIndex, className}: InputProps) {

  const { theme } = useContext(ThemeContext);

  return (
    <TextContainer>
      <InputField
        className={className}
        type={type}
        placeholder={placeholder}
        theme={theme}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        readOnly={readonly}
        checked={checked}
        style={style}
        tabIndex={tabIndex}
      />
    </TextContainer>
  )
};