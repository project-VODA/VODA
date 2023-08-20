import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getArticles } from '../../apis/board';
import styled from 'styled-components';
import useErrorHandlers from '../../hooks/useError';

import '../../styles/detail/DetailBoardList.css'

type Article = {
  articleNo: number;
  articleTitle: string;
  userEmail: string;
  articleRegTime: string;
};

type ArticleList = Article[];

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const TableContainer = styled.div`
  justify-content: center;
  font-size: 30px;

  .boardTable {
    width: 100%;
    border-collapse: collapse;
  }

  .boardTable th, .boardTable td {
    padding: 10px;
    text-align: center;
  }

  .boardTable tbody tr:hover {
    background-color: black;
  }

  .boardTable a {
    color: #FFC300;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일 화면에서 세로 방향으로 배치 */
  }
`;


const BoardList: React.FC = () => {
  
  const [articles, setArticles] = useState<ArticleList>([]);
  const errorHandlers = useErrorHandlers();

  useEffect(handleGetArticles, [])

  function handleGetArticles() {
    getArticles()
      .then((res) => {
        setArticles(res.data.content);
      })
      .catch((err) => {
        errorHandlers(err.response, handleGetArticles);
      })
    }

if (localStorage.getItem('theme' ) === 'simple') {
  return (
    <TableContainer>
      <div className='boardList'>
        <table className='boardTable'>
          <colgroup>
            <col width="10%" />
            <col width="40%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: Article) => (
              <tr key={article.articleNo}>
                <td>{article.articleNo}</td>
                <td>
                  <Link to={`/view/${article.articleNo}`}>
                    {article.articleTitle}
                  </Link>
                </td>
                <td>{article.userEmail}</td>
                <td>{article.articleRegTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableContainer>
  );
}

return (
    <>
      <div className='DetailBoardList'>
        <table className='DetailBoardTable'>
          <colgroup>
            <col width="10%" />
            <col width="40%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <thead className='DetailBoardthead'>
            <tr>
              <th>No. </th>
              <th>제목</th>
              <th>작성자</th>
              <th className='writtenDate'>작성일자</th>
            </tr>
          </thead>
        </table>
          <hr/>
        <table className='DetailBoardTable'>
          <colgroup>
            <col width="10%" />
            <col width="40%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            {articles.map((article: Article) => (
              <tr key={article.articleNo}>
                <td>{article.articleNo}</td>
                <td>
                  <StyledLink to={`/view/${article.articleNo}`}>
                    {article.articleTitle}
                  </StyledLink>
                </td>
                <td>{article.userEmail}</td>
                <td className='writtenDate'>{article.articleRegTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
  
export default BoardList;