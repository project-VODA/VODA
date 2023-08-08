import React, { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { SimpleTheme, Theme } from '../styles/theme';

interface ToggleProps {
  theme: Theme;
  'aria-label'?: string
}

const ToggleButton = styled('button')<ToggleProps>`
  position: fixed;
  width: 125px;
  height: 45px;
  right: 1.5rem;
  bottom: 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.toggleBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 10000;

  &:hover {
    filter: brightness(
      ${({ theme }) => (theme === SimpleTheme ? '0.9' : '1.13')}
    );
  }
`;

const Emoji = styled.figure`
  width: 33px;
  height: 33px;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModeContent = styled.p`
  font-size: 0.8rem;
  margin-left: 5px;
  
  font-weight: bold;
`;

export default function ModeToggle(): ReactElement {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme} theme={theme}>
      {theme !== SimpleTheme ? (
        <>
          <Emoji>
            <span role="img" aria-label="현재 디테일 모드입니다. 심플 모드로의 전환을 원한다면 버튼을 눌러주세요   ">
              👨‍🦯
            </span>
          </Emoji>
          <ModeContent>심플 모드</ModeContent>
        </>
      ) : (
        <>
          <Emoji>
            <span role="img" aria-label="현재 심플 모드입니다. 디테일 모드로의 전환을 원한다면 버튼을 눌러주세요   ">
              🚶‍♂
            </span>
          </Emoji>
          <ModeContent>디테일 모드</ModeContent>
        </>
      )}
    </ToggleButton>
  );
}