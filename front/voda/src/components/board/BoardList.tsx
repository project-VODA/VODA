import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getArticles } from '../../apis/board';
import styled from 'styled-components';

type Article = {
  articleNo: number;
  articleTitle: string;
  userEmail: string;
  articleRegTime: string;
};

type ArticleList = Article[];

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
`;

const BoardList: React.FC = () => {
  
  const [articles, setArticles] = useState<ArticleList>([]);

  useEffect(() => {
    getArticles()
    .then((res: ArticleList) => {
      console.log(res);
      setArticles(res);
    })
    .catch((err: Error) => {
      console.log(err);
    })
  }, [])
  
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
  
export default BoardList;