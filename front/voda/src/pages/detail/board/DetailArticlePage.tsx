import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link  } from 'react-router-dom';
import styled from 'styled-components';

import { getArticleDetail, updateArticle } from '../../../apis/board';

import Title from '../../../components/Title';
import Button from '../../../components/RegisterButton';
import ArticleHeader from '../../../components/board/ArticleHeader';
import ArticleContent from '../../../components/board/ArticleContent';
import useErrorHandlers from '../../../hooks/useError';

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

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

    const navigate = useNavigate();
    const errorHandlers = useErrorHandlers();

    // state
    const [detailBoardData, setDetailBoardData] = useState<any>([]);

    useEffect(handleArticlDetail, [])

    const RedirectListPage = () => {
        navigate('/feedback');
    }

    function handleArticlDetail() {
      getArticleDetail(articleNo)
        .then((res) => {
          setDetailBoardData(res);
        })
        .catch((err) => {
          errorHandlers(err.response, handleArticlDetail);
        })
    }

    return (

        <>
          <StyledLink to='' aria-label={`${detailBoardData.articleTitle} 상세 조회 페이지입니다.`}>
            <Title title={detailBoardData.articleTitle} />
          </StyledLink>
                {/* 게시글 header */}
                {/* <StyledLink to='' aria-label={`${detailBoardData.articleNo}번째 글, 작성일시 ${detailBoardData.articleRegTime}`}> */}
                  <ArticleHeader userEmail={detailBoardData.userEmail} articleNo={detailBoardData.articleNo} articleRegDate={detailBoardData.articleRegTime} aria-label={`${detailBoardData.articleNo}번째 글, 작성일시 ${detailBoardData.articleRegTime}`}/>
                {/* </StyledLink> */}

                {/* 게시글 content */}
                {/* <StyledLink to='' aria-label={`게시글 내용, ${detailBoardData.articleTitle}`}> */}
                  <ArticleContent articleContent={detailBoardData.articleContent} aria-label={`게시글 내용, ${detailBoardData.articleContent}`}/>
                {/* </StyledLink> */}
            {/* <Button text='수정' onClick={ModifyOneArticle} /> */}
            <Button text='목록' onClick={RedirectListPage} />
        </>
    )
};

export default SimpleDetailArticle;