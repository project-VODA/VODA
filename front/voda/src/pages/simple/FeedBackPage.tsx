import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import Title from '../../components/Title';
import BoardList from '../../components/board/BoardList';
import WriteButton from '../../components/board/WriteButton';
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

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
          <StyledLink to='' aria-label='고객의 소리함 페이지입니다.'>
            <Title title='고객의 소리함' aria-label='고객의 소리함 페이지입니다.'/>
          </StyledLink>
            <ListContainer>
                <BoardList />

                <WriteButton text='글 작성' onClick={handleWriteArticle} aria-label='새 글 작성하기'/>
            </ListContainer>



        </>
    );
};

export default SimpleFeedBack;
