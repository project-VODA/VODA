import React, { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import styled from 'styled-components';

import { getArticleDetail, updateArticle } from '../../../apis/board';

import Title from '../../../components/Title';
import Button from '../../../components/RegisterButton';
import ArticleHeader from '../../../components/board/ArticleHeader';
import ArticleContent from '../../../components/board/ArticleContent';


const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  
`;


const SimpleDetailArticle = () => {

    const params = useParams();
    const articleNo = Number(params.articleNo);

    // state
    const [detailBoardData, setDetailBoardData] = useState<any>([]);

    useEffect(() => {
        getArticleDetail(articleNo)
        .then((res) => {
          console.log(res);
          setDetailBoardData(res);
        })
        .catch((err: Error) => {
          console.log(err);
        })
      }, [])

    const navigate = useNavigate();

    const RedirectListPage = () => {
        navigate('/feedback');
    }

    return (

        <>
            <ItemContainer>

                <Title title={detailBoardData.articleTitle} />
                {/* 게시글 header */}
                <ArticleHeader articleNo={detailBoardData.articleNo} articleRegDate={detailBoardData.articleRegTime} />

                {/* 게시글 content */}
                <ArticleContent articleContent={detailBoardData.articleTitle} />
            </ItemContainer>

            {/* <Button text='수정' onClick={ModifyOneArticle} /> */}
            <Button text='목록' onClick={RedirectListPage} />

        </>

    )



};

export default SimpleDetailArticle;