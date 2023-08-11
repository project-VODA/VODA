import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { registArticle } from '../../../apis/board';

import Title from '../../../components/Title';
import Input from '../../../components/InputText';
import RegistButton from '../../../components/RegisterButton';
import { UserInfoType } from '../../../store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Link } from "react-router-dom";
import useErrorHandlers from '../../../hooks/useError';

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


const SimpleWriteArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const errorHandlers = useErrorHandlers();

  const articleData = {
    articleTitle: title,
    articleContent: content,
  }

  const handleRegist = () => {
    registArticle(articleData)
      .then((res) => {
        RedirectListPage();
      })
      .catch((err) => {
        errorHandlers(err.response, handleRegist);
      })
  }

  const navigate = useNavigate();

  const RedirectListPage = () => {
    navigate('/feedback');
  }

  return (
    <>
      <StyledLink to='' aria-label='새 문의글을 작성하는 페이지입니다.'>
        <Title title='문의글 작성' />
      </StyledLink>
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <QuillContainer>
        <StyledQuill
          value={content}
          onChange={setContent}
          placeholder="건의하고 싶은 내용을 자세히 입력해주세요"
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
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
            background: 'rgba(200, 200, 200, 0.5)',
            borderRadius: '20px',
          }}
          theme="snow"
        />
      </QuillContainer>

      <RegistButton text="등록" onClick={handleRegist}></RegistButton>
      
    </>
  );
};
  
export default SimpleWriteArticle;
