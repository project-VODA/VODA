import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { registArticle } from '../../../apis/board';

import Title from '../../../components/Title';
import Input from '../../../components/InputText';
import InputTextArea from '../../../components/InputTextArea';
import RegistButton from '../../../components/RegisterButton';
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;


const SimpleWriteArticle = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const articleData = {
    // --------------------- 추후 redux 활용 --------------------------
    userEmail: email,
    articleTitle: title,
    articleContent: content,
  }

  // 현재 로그인 중인 유저 이메일을 작성자 이메일로 화면 마운트 시 적용
  useEffect(() => {
    setEmail(sessionStorage.getItem("userEmail"));
  }, []);

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
      <StyledLink to='' aria-label='새 문의글을 작성하는 페이지입니다.'>
        <Title title='문의글 작성' />
      </StyledLink>
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
