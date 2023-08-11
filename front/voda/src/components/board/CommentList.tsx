import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { getComments } from '../../apis/board';
import Button from '../RegisterButton';
import { useAppSelector } from '../../hooks/reduxHook';
import SmallRedButton from '../SmallRedBtn';
import SmallYellowButton from '../SmallYellowBtn';


type Comment = {
  commentNo: number;
  userName: string;
  commentContent: string;
  commentRegTime: string;
};

type CommentList = Comment[];

const TableContainer = styled.div`
  justify-content: center;
  font-size: 16px;
  width: 58%;

  .commentTable {
    width: 100%;
    border-collapse: collapse;
  }

  .commentTable th, .commentTable td {
    padding: 10px;
    text-align: center;
    padding-bottom: 15px;
  }
`;

const CommentInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
`;

const CommentInput = styled.textarea`
  justify-content: center;
  border: 1px solid #cecdce;
  border-radius: 3px;
  padding: 8px;
  background-color: #f8f8f844;
  font-size: 16px;
  width: 90%;
  margin-bottom: 20px;
  resize: none;
`;

const CommentWriteButton = styled(Button)`
  width: 10%;
  border: none;
  display: flex;
`;

const CommentList: React.FC<{ articleNo: number }> = ({ articleNo }) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
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
  
  const handleWriteComment = () => {

  }

  const handleModifyComment = () => {

  }

  const handleDeleteComment = () => {

  }

  return (
    <>
      <TableContainer>
        <div className='commentList'>
          <table className='commentTable'>
            {/* <colgroup>
              <col width="10%" />
              <col width="70%" />
              <col width="20%" />
            </colgroup> */}
            <tbody>
              {comments.map((comment: Comment) => (
                <tr key={comment.commentNo}>
                  <td>{comment.userName}</td>
                  <td>{comment.commentContent}</td>
                  <td>{comment.commentRegTime}</td>
                  { userInfo.role == "1" ? <td><SmallYellowButton onClick={handleModifyComment} text="수정" aria-label="댓글 수정" /></td> : null}
                  { userInfo.role == "1" ? <td><SmallRedButton onClick={handleDeleteComment} text="삭제" aria-label="댓글 삭제" /></td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        { userInfo.role == "1" ? 
          <CommentInputContainer>
            <CommentInput/>
            <SmallYellowButton onClick={handleWriteComment} aria-label='댓글을 등록하는 버튼입니다.' text="등록" />
          </CommentInputContainer> :
          null
        }
        
      </TableContainer>



      
    </>
  );
}
  
export default CommentList;