import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { registArticle } from '../../../apis/board';

import Title from '../../../components/Title';
import Input from '../../../components/InputText';
import InputTextArea from '../../../components/InputTextArea';
import RegistButton from '../../../components/RegisterButton';
import { UserInfoType } from '../../../store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


const SimpleWriteArticle = () => {
  // redux에서 저장된 정보 가져오기
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })
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
    setEmail(userInfo.userEmail);
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
