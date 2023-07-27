import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import Title from '../../components/Title';
import BoardList from '../../components/board/BoardList';
import WriteButton from '../../components/board/WriteButton';

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
            <ListContainer>
                <Title title='고객의 소리함' />

                <BoardList />

                <WriteButton text='글 작성' onClick={handleWriteArticle} />
            </ListContainer>



        </>
    );
};

export default SimpleFeedBack;
