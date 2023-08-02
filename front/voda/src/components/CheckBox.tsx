import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';


interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: any) => void;
  'aria-label'?: string;
}

const CheckboxContainer = styled.label`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

// 모드 설정 추가해줘야 됌!
const CheckboxInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin: 4px;
  margin-bottom: 12px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  
  &:checked {
    background: ${({ theme }) =>
      theme === SimpleTheme ? '#FFD60A' : '#003566'};
    transition: all 0.1s ease-in-out;
  }
`;

const CheckboxLabel = styled.span`
  font-size: 20px;
  margin: 4px;
  margin-bottom: 12px;
`;


export default function CheckBox({ label, checked, onChange, "aria-label":ariaLabel }: CheckboxProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <CheckboxContainer>
      <CheckboxInput 
        theme={theme} 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        aria-label={ariaLabel}
      />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};