import styled from 'styled-components';
import { Theme } from '../../styles/theme';
import DOMPurify from "dompurify";

interface ThemeProps {
  theme: Theme;
}

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
  text-align: left;

  &::placeholder {
    text-align: center;
  }

  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0.7em;
    margin-top: 0.7em;
    font-weight: bolder;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul, ol {
    margin-left: 1.5em; 
  }

  li {
    margin-bottom: 0.5em;
  }

`;


interface ContentProps {
  articleContent: string;
  'aria-label'?: string;
  tabIndex? : number;
}

export default function ArticleContent( {articleContent, 'aria-label':ariaLabel, tabIndex} : ContentProps ) {
    const sanitizedContent = DOMPurify.sanitize(articleContent);

    return(
      <>
        <ContentField tabIndex={tabIndex} aria-label={ariaLabel} dangerouslySetInnerHTML =
        {{ __html: sanitizedContent }}
        />
      </>
    )
}
