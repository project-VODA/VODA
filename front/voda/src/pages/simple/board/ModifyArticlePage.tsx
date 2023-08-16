import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// registArticle, 
import { getArticleDetail, updateArticle } from '../../../apis/board';

import SimpleTitle from '../../../components/SimpleTitle';
import Input from '../../../components/InputText';
import RegistButton from '../../../components/RegisterButton';
// import { UserInfoType } from '../../../store/userSlice';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store/store';
import { Link } from "react-router-dom";
import { useAppSelector } from '../../../hooks/reduxHook';
// import useErrorHandlers from '../../../hooks/useError';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const QuillContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledQuill = styled(ReactQuill)`
  .ql-toolbar.ql-snow {
    border: none;
  }
  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor {
    justify-content: center;
  }
`

const SimpleModifyArticle = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const articleNo = Number(params.articleNo);

  useEffect(() => {
    getArticleDetail(articleNo)
      .then((res) => {
        setTitle(res.articleTitle);
        setContent(res.articleContent);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [articleNo])

  const articleUpdateRequest = {
    articleNo: articleNo,
    articleTitle: title,
    articleContent: content,
    userEmail: userInfo.userEmail,
  }

  const handleUpdate = () => {
    updateArticle(articleUpdateRequest)
      .then((res) => {
        navigate(`/view/${articleNo}`);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <>
      <StyledLink to='/home' aria-label='새 게시물을 작성하는 페이지입니다. 홈 페이지로 이동하시려면 이 버튼을 누르세요.'>
        <SimpleTitle imgSrc='SimpleLogo' aria-label='고객의 소리함 페이지입니다.'/>
      </StyledLink>
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="제목을 수정하시려면 이 섹션을 수정하세요"
      />
      <QuillContainer>
        <StyledQuill
          value={content}
          onChange={setContent}
          placeholder="내용을 수정하시려면 이 섹션을 수정하세요"
          modules={{
            toolbar: [
              [ { 'header': '1', 'aria-label': 'H1 글자 크기' },
                { 'header': '2', 'aria-label': 'H2 글자 크기' },],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              [{ 'color': [] }, { 'background': [] }],
              ['link'],
              ['clean'],
            ],
          }}
          style={{
            width: '58%',
            maxWidth: '600px',
            marginBottom: '2%',
            color: '#001d3d',
            background: 'white',
            borderRadius: '20px',
          }}
          theme="snow"
        />
      </QuillContainer>

      <RegistButton text="수정" onClick={handleUpdate}></RegistButton>

      
    </>
  );
};
  
export default SimpleModifyArticle;
