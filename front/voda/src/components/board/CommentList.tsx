import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { deleteComment, getComments, registComment, updateComment } from '../../apis/board';
import { useAppSelector } from '../../hooks/reduxHook';
import SmallRedButton from '../SmallRedBtn';
import SmallYellowButton from '../SmallYellowBtn';
import CommentWriteBtn from '../CommentBtn';
import '../../styles/detail/CommentList.css'
import useErrorHandlers from '../../hooks/useError';

// react-icons
import { AiTwotoneEdit } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { LiaReplySolid } from 'react-icons/lia'


type Comment = {
  commentNo: number;
  userName: string;
  commentContent: string;
  commentRegTime: string;
};

type CommentList = Comment[];

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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

  const errorHandlers = useErrorHandlers();

  useEffect(() => {
    handleGetComments(articleNo);
  }, [])
  
  const handleWriteComment = () => {
    registComment(commentRequest)
      .then((res) => {
        handleCommentsAfterWrite(articleNo);
      })
      .catch((err) => {
        errorHandlers(err.response, handleWriteComment);
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
        handleCommentsAfterModify(articleNo);
      })
      .catch((err) => {
        errorHandlers(err.response, handleModifyConfirm, commentNo);
      }) 
  }

  const handleDeleteComment = (commentNo: number) => {
    deleteComment(commentNo)
      .then((res) => {
        handleCommentsAfterWrite(articleNo);
      })
      .catch((err) => {
        errorHandlers(err.response, handleDeleteComment, commentNo);
      })
  }

  /* for error handling  */
  const handleGetComments = (articleNo: number) => {
    getComments(articleNo)
    .then((res: CommentList) => {
      setComments(res);
    })
    .catch((err) => {
      errorHandlers(err.response, handleGetComments, articleNo);
    })
  }

  const handleCommentsAfterWrite = (articleNo: number) => {
    getComments(articleNo)
    .then((res: CommentList) => {
      setComments(res);
      setContent('');
    })
    .catch((err) => {
      errorHandlers(err.response, handleCommentsAfterWrite, articleNo);
    })
  }

  const handleCommentsAfterModify = (articleNo: number) => {
    getComments(articleNo)
    .then((res: CommentList) => {
      setComments(res);
      setContent('');
      setIsClickModify(-1);
    })
    .catch((err) => {
      errorHandlers(err.response, handleCommentsAfterModify, articleNo);
    })
  }

  return (
    <>
      <TableContainer>
        <div className='commentList'>
          <table className='commentTable'>
            <tbody>
              {comments.map((comment: Comment) => (
                <tr key={comment.commentNo}>
                  <td className='commentName' style={{ verticalAlign: 'middle' }}>{comment.userName}</td>
                  <td className='commentContent' style={{ textAlign: 'left', verticalAlign: 'middle' }}>{ isClickModify === comment.commentNo ? <input type='text' value={modifiedContent} onChange={(e) => setModifiedContent(e.target.value)} /> : <span>{comment.commentContent}</span>}</td>
                  {localStorage.getItem('theme') === 'simple' ? (
                    <ButtonsContainer>
                    <td style={{ margin: '0px', padding: '18px 0px 0px' }}>{comment.commentRegTime}</td>
                      { userInfo.role == "1" && isClickModify !== comment.commentNo ? <td style={{ margin: '0px', padding: '0px', }}><SmallYellowButton onClick={(e) => handleModifyComment(comment.commentNo, comment.commentContent)} text="수정" aria-label="댓글 수정" /></td> : null}
                      { userInfo.role == "1" && isClickModify === comment.commentNo ? <td style={{ margin: '0px', padding: '0px', }}><SmallYellowButton onClick={(e) => handleModifyConfirm(comment.commentNo)} text="확인" aria-label="댓글 수정 확인" /></td> : null}
                      { userInfo.role == "1" && isClickModify !== comment.commentNo ? <td style={{ margin: '0px', padding: '0px', }}><SmallRedButton style={{ width: '60px' }} onClick={(e) => handleDeleteComment(comment.commentNo)} text="삭제" aria-label="댓글 삭제" /></td> : null}
                      { userInfo.role == "1" && isClickModify === comment.commentNo ? <td style={{ margin: '0px', padding: '0px', }}><SmallRedButton style={{ width: '60px' }} onClick={handleCancelModify} text="취소" aria-label="댓글 수정 취소" /></td> : null}
                    </ButtonsContainer>
                  ):(
                    <ButtonsContainer>
                    <td>{comment.commentRegTime}</td>
                      { userInfo.role == "1" && isClickModify !== comment.commentNo ? <td style={{ margin: '0px', padding: '4px 0px 0px', fontSize: '25px' }}><AiTwotoneEdit onClick={(e) => handleModifyComment(comment.commentNo, comment.commentContent)} aria-label="댓글 수정" /></td> : null}
                      { userInfo.role == "1" && isClickModify === comment.commentNo ? <td style={{ margin: '0px', padding: '4px 0px 0px', fontSize: '25px' }}><BsCheckLg onClick={(e) => handleModifyConfirm(comment.commentNo)} aria-label="댓글 수정 확인" /></td> : null}
                      { userInfo.role == "1" && isClickModify !== comment.commentNo ? <td style={{ margin: '0px', padding: '4px 0px 0px', fontSize: '25px' }}><FiX style={{ width: '60px' }} onClick={(e) => handleDeleteComment(comment.commentNo)} aria-label="댓글 삭제" /></td> : null}
                      { userInfo.role == "1" && isClickModify === comment.commentNo ? <td style={{ margin: '0px', padding: '4px 0px 0px', fontSize: '25px' }}><LiaReplySolid style={{ width: '60px' }} onClick={handleCancelModify} aria-label="댓글 수정 취소" /></td> : null}
                    </ButtonsContainer>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        { userInfo.role == "1" ? 
          <CommentInputContainer>
            <CommentInput placeholder='댓글 내용을 입력해주세요.' value={content} onChange={(e) => setContent(e.target.value)}/>
            <CommentWriteBtn onClick={handleWriteComment} aria-label='댓글을 등록하는 버튼입니다.' text="등록" />
          </CommentInputContainer>
          : null
        }
        
      </TableContainer>
    </>
  );
}
  
export default CommentList;