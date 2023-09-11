import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { registArticle } from '../../../apis/board';

import SimpleTitle from '../../../components/SimpleTitle';
import Input from '../../../components/InputText';
import RegistButton from '../../../components/RegisterButton';
import { Link } from "react-router-dom";
import useErrorHandlers from '../../../hooks/useError';

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const QuillContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  max-width: 700px;
  min-width: 210px;
  width: 44.5%;
`;

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
`;


const SimpleWriteArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const errorHandlers = useErrorHandlers();

  const articleData = {
    articleTitle: title,
    articleContent: content,
  };

  const handleRegist = () => {
    if(articleData.articleTitle && articleData.articleContent) {
      registArticle(articleData)
        .then((res) => {
          RedirectListPage();
        })
        .catch((err) => {
          errorHandlers(err.response, handleRegist);
        })
    } else {
      alert("제목이나 내용이 비어있습니다.");
    };
  };

  const navigate = useNavigate();

  const RedirectListPage = () => {
    navigate('/feedback');
  }

  return (
    <>
      <StyledLink to='/home' aria-label='새 게시물을 작성하는 페이지입니다. 홈 페이지로 이동하시려면 이 버튼을 누르세요.'>
        <SimpleTitle imgSrc='SimpleLogo' aria-label='고객의 소리함 페이지입니다.'/>
      </StyledLink>
      <StyledInput
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="새 게시물의 제목을 입력하세요"
      />
      <QuillContainer>
        <StyledQuill
          value={content}
          onChange={setContent}
          placeholder="건의하고 싶은 내용을 자세히 입력해주세요"
          aria-label="글 작성시에 사용할 수 있는 버튼이 11개 준비되어 있습니다. 순서에 따라 H1크기, H2크기, 순서 매기기, 리스트로 정렬하기, 볼드체, 이탤릭체, 밑줄, 글자색, 배경색, 링크, 초기화 버튼입니다."
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
            width: '50vw',
            maxWidth: '700px',
            minWidth:'210px',
            marginBottom: '2%',
            color: '#001d3d',
            background: 'white',
            borderRadius: '20px',
          }}
          theme="snow"
        />
      </QuillContainer>

      <RegistButton style={{ width: '50vw', maxWidth:'700px'}} text="등록" onClick={handleRegist}></RegistButton>
      
    </>
  );
};
  
export default SimpleWriteArticle;
