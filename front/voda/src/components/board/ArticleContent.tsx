import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { SimpleTheme, Theme } from '../../styles/theme';


interface ThemeProps {
  theme: Theme;
}

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// 테마(모드) 별로 색상 고려해줘야됌!!
const ContentField = styled.div<ThemeProps>`
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
`;

interface ContentProps {
    articleContent: String;
    'aria-label'?: string;
}

export default function ArticleContent( {articleContent, 'aria-label':ariaLabel} : ContentProps ) {
    const { theme } = useContext(ThemeContext);

    return(
        <ContentField aria-label={ariaLabel}>{articleContent}</ContentField>
    )
}
