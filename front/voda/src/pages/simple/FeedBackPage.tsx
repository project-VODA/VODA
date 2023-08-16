// import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import SimpleTitle from '../../components/SimpleTitle';
import BoardList from '../../components/board/BoardList';
import WriteButton from '../../components/board/WriteButton';
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const NewPostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px 0px 25px;
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimpleFeedBack = () => {

    const navigate = useNavigate();

    const handleWriteArticle= () => {
        navigate('/write');
    }

    return (
        <>
          <StyledLink to='/home' aria-label='고객의 소리함 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요.'>
            <SimpleTitle imgSrc='SimpleLogo' aria-label='고객의 소리함 페이지입니다.'/>
          </StyledLink>
              <NewPostContainer>
                <WriteButton text='글 작성' onClick={handleWriteArticle} aria-label='새 글 작성하기'/>
              </NewPostContainer>
            <ListContainer>
                <BoardList />

            </ListContainer>



        </>
    );
};

export default SimpleFeedBack;
