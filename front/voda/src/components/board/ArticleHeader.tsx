// components/Input.tsx

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
const HeaderField = styled.div<ThemeProps>`
  width: 58%;
  height: 30px;
  border-radius: 20px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};


  &::placeholder {
    text-align: center;
  }
`;

const LeftSpanField = styled.span`
    text-align: left;
`;

const RightSpanField = styled.span`
    text-align: right;
`;

interface HeaderProps {
    articleNo: Number;
    // articleTitle : String;
    articleRegDate : String;
}

export default function ArticleHeader( {articleNo, articleRegDate  } : HeaderProps ) {
    const { theme } = useContext(ThemeContext);

    return(
        <HeaderField>
            <LeftSpanField>No.{articleNo}</LeftSpanField>
            <RightSpanField>작성일시:{articleRegDate}</RightSpanField>
        </HeaderField>
    )
}
