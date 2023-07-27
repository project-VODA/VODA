import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { registArticle } from '../../../apis/board';

import Title from '../../../components/Title';
import Input from '../../../components/InputText';
import InputTextArea from '../../../components/InputTextArea';
import RegistButton from '../../../components/RegisterButton';


const SimpleWriteArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const articleData = {
    // --------------------- 추후 redux 활용 --------------------------
    userEmail: "voda@voda.com",
    articleTitle: title,
    articleContent: content,
  }

  const handleRegist = () => {
    registArticle(articleData)
      .then((res) => {
        RedirectListPage();
      })
      .catch((err) => {
        // --------------------추후 에러 페이지 연결-----------------
        console.log(err);
      })
  }

  const navigate = useNavigate();

  const RedirectListPage = () => {
    // ----------------- 추후 리스트 페이지 연결---------------------
    navigate('/feedback');
  }

  return (
    <>
      <Title title='문의글 작성' />

      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <InputTextArea
        placeholder="건의하고 싶은 내용을 자세히 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <RegistButton text="등록" onClick={handleRegist}></RegistButton>
      
    </>
  );
};
  
export default SimpleWriteArticle;
