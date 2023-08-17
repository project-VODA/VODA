import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link  } from 'react-router-dom';
import styled from 'styled-components';

// updateArticle
import { getArticleDetail } from '../../../apis/board';

import Title from '../../../components/Title';
import Button from '../../../components/RegisterButton';
import ArticleHeader from '../../../components/board/ArticleHeader';
import ArticleContent from '../../../components/board/ArticleContent';
import CommentList from '../../../components/board/CommentList';
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

    useEffect(handleArticlDetail, []);

    const RedirectListPage = () => {
        navigate('/feedback');
    }

    function handleArticlDetail() {
      getArticleDetail(articleNo)
        .then((res) => {
          setDetailBoardData(res);

          console.log("작성자: " + detailBoardData.userEmail);
          console.log("글 내용: " + detailBoardData.articleContent);
        })
        .catch((err) => {
          errorHandlers(err.response, handleArticlDetail);
        })
    }

    return (
      <>
        <StyledLink to='' aria-label={`${detailBoardData.articleTitle} 상세 조회 페이지입니다.`}>
          <Title tabIndex={0} title={detailBoardData.articleTitle} />
        </StyledLink>
          <ItemContainer tabIndex={0}>
              {/* 게시글 header */}
              {/* <StyledLink to='' aria-label={`${detailBoardData.articleNo}번째 글, 작성일시 ${detailBoardData.articleRegTime}`}> */}
            <ArticleHeader tabIndex={1} userEmail={detailBoardData.userEmail} articleNo={detailBoardData.articleNo} articleRegDate={detailBoardData.articleRegTime} aria-label={`${detailBoardData.articleNo}번째 글, 작성일시 ${detailBoardData.articleRegTime}`}/>
              {/* </StyledLink> */}
              {/* 게시글 content */}
              {/* <StyledLink to='' aria-label={`게시글 내용, ${detailBoardData.articleTitle}`}> */}
            <ArticleContent tabIndex={2} articleContent={detailBoardData.articleContent} aria-label={`게시글 내용, ${detailBoardData.articleContent}`}/>
              {/* </StyledLink> */}
            {/* <CommentContent></CommentContent> */}
            <CommentList articleNo={articleNo} />
          </ItemContainer>

          {/* <Button text='수정' onClick={ModifyOneArticle} /> */}
          <Button text='목록' onClick={RedirectListPage} />
      </>
    )
};

export default SimpleDetailArticle;