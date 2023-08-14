// components/Input.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { SimpleTheme, Theme } from '../../styles/theme';
import RedButton from '../SmallRedBtn';
import YellowButton from '../SmallYellowBtn';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../apis/board';
import { useAppSelector } from '../../hooks/reduxHook';


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
  /* border-radius: 20px; */
  font-size: 16px;
  padding: 8px;
  margin-bottom: 16px;
  /* border: 1px solid ${({ theme }) => theme.text}; */
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::placeholder {
    text-align: center;
    
  }
`;

const LeftSpanField = styled.span`
  text-align: left;
  margin-right: 20px;
`;

const RightSpanField = styled.span`
  text-align: right;
  display: flex;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ModifyButton = styled(YellowButton)`
`;

const DeleteButton = styled(RedButton)`
`;

interface HeaderProps {
    userEmail: string;
    articleNo: number;
    // articleTitle : String;
    articleRegDate : String;
}

export default function ArticleHeader( { userEmail, articleNo, articleRegDate  } : HeaderProps ) {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const handleDeleteArticle = () => {
    deleteArticle(articleNo)
      .then((res) => {
        navigate('/feedback');
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return(
      <HeaderField>
          <LeftSpanField>글번호 - {articleNo}</LeftSpanField>
          <RightSpanField>작성일자 - {articleRegDate}</RightSpanField>
            { userInfo.role == "1" || userInfo.userEmail == userEmail ? 
              <ButtonsContainer>
                <ModifyButton text="수정" onClick={(e) => navigate(`/modify/${articleNo}`)} />
                <DeleteButton text="삭제" onClick={handleDeleteArticle} />
              </ButtonsContainer> :
              null
            }            
      </HeaderField>
  )
}
