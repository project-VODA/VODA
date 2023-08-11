import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { deleteComment, getComments, registComment, updateComment } from '../../apis/board';
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
  const [comments, setComments] = useState<CommentList>([]);
  const [content, setContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');
  const [isClickModify, setIsClickModify] = useState(-1);

  const commentRequest = {
    userEmail: userInfo.userEmail,
    articleNo: articleNo,
    commentContent: content,
  };

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
    registComment(commentRequest)
      .then((res) => {
        getComments(articleNo)
        .then((res: CommentList) => {
          console.log(res);
          setComments(res);
          setContent('');
        })
        .catch((err: Error) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleModifyComment = (commentNo: number, initialContent: string) => {
    setModifiedContent(initialContent);
    setIsClickModify(commentNo);
  }

  const handleCancelModify = () => {
    setModifiedContent('');
    setIsClickModify(-1);
  }

  const handleModifyConfirm = (commentNo: number) => {
    const modifyCommentRequest = {
      commentNo: commentNo,
      articleNo: articleNo,
      commentContent: modifiedContent,
      userEmail: userInfo.userEmail,
    }

    updateComment(modifyCommentRequest)
      .then((res) => {
        getComments(articleNo)
          .then((res: CommentList) => {
            console.log(res);
            setComments(res);
            setContent('');
            setIsClickModify(-1);
          })
          .catch((err: Error) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.error(err);
      }) 
  }

  const handleDeleteComment = (commentNo: number) => {
    deleteComment(commentNo)
      .then((res) => {
        getComments(articleNo)
          .then((res: CommentList) => {
            console.log(res);
            setComments(res);
            setContent('');
          })
          .catch((err: Error) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.error(err);
      })
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
                  <td>{ isClickModify === comment.commentNo ? <input type='text' value={modifiedContent} onChange={(e) => setModifiedContent(e.target.value)} /> : <span>{comment.commentContent}</span>}</td>
                  <td>{comment.commentRegTime}</td>
                  { userInfo.role == "1" && isClickModify !== comment.commentNo ? <td><SmallYellowButton onClick={(e) => handleModifyComment(comment.commentNo, comment.commentContent)} text="수정" aria-label="댓글 수정" /></td> : null}
                  { userInfo.role == "1" && isClickModify === comment.commentNo ? <td><SmallYellowButton onClick={(e) => handleModifyConfirm(comment.commentNo)} text="확인" aria-label="댓글 수정 확인" /></td> : null}
                  { userInfo.role == "1" && isClickModify !== comment.commentNo ? <td><SmallRedButton onClick={(e) => handleDeleteComment(comment.commentNo)} text="삭제" aria-label="댓글 삭제" /></td> : null}
                  { userInfo.role == "1" && isClickModify === comment.commentNo ? <td><SmallRedButton onClick={handleCancelModify} text="취소" aria-label="댓글 수정 취소" /></td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        { userInfo.role == "1" ? 
          <CommentInputContainer>
            <CommentInput placeholder='댓글 내용을 입력해주세요.' value={content} onChange={(e) => setContent(e.target.value)}/>
            <SmallYellowButton onClick={handleWriteComment} aria-label='댓글을 등록하는 버튼입니다.' text="등록" />
          </CommentInputContainer> :
          null
        }
        
      </TableContainer>



      
    </>
  );
}
  
export default CommentList;