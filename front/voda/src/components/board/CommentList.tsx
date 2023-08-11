import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { getComments } from '../../apis/board';

type Comment = {
  commentNo: number;
  userName: string;
  commentContent: string;
  commentRegTime: string;
};

type CommentList = Comment[];

const TableContainer = styled.div`
  justify-content: center;
  font-size: 14px;

  .commentTable {
    width: 100%;
    border-collapse: collapse;
  }

  .commentTable th, .commentTable td {
    padding: 10px;
    text-align: center;
  }

`;

const CommentList: React.FC<{ articleNo: number }> = ({ articleNo }) => {

  const params = useParams();
  const [comments, setComments] = useState<CommentList>([]);

  useEffect(() => {
    getComments(articleNo)
    .then((res: CommentList) => {
      console.log(res);
      setComments(res);
    })
    .catch((err: Error) => {
      console.log(err);
    })
  }, [])
  
  return (
    <>
      <TableContainer>
        <div className='commentList'>
          <table className='commentTable'>
            <colgroup>
              <col width="10%" />
              <col width="70%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              {comments.map((comment: Comment) => (
                <tr key={comment.commentNo}>
                  <td>{comment.userName}</td>
                  <td>{comment.commentContent}</td>
                  <td>{comment.commentRegTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableContainer>
      
    </>
  );
}
  
export default CommentList;