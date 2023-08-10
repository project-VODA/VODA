import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { UserSettingType, userSliceLogin } from "../../store/userSlice";

import { loginServer } from "../../apis/user";
import { Link as TitleLink } from "react-router-dom" ;
import SimpleTitle from '../../components/SimpleTitle';
import Input from '../../components/SubmitInputText';
import LoginButton from '../../components/RegisterButton';
import Link from "../../components/TextLink";
import { access } from "fs";

import '../../styles/simple/RegisterContainer.css'
import styled from "styled-components";
import useErrorHandlers from "../../hooks/error";
import { useMode } from "../../hooks/useMode";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/reduxHook";

const StyledLink = styled(TitleLink)`
text-decoration: none;
color: inherit;
`;

const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = {
    userEmail: email,
    userPass: password,
  };
  const dispatch = useAppDispatch();
  const errorHandlers = useErrorHandlers();

  const handleLogin = () => {
    if (email === '') {
      alert("이메일을 입력해주세요");
    } else if (password === '') {
      alert("비밀번호를 입력해주세요");
    } else {
      loginServer(userData)
        .then((res) => {
          alert("로그인 성공");
          // userSlice에 저장
          dispatch(userSliceLogin ({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          }));
          // 메인페이지로 리다이렉트
          RedirectHomePage();
        })
        .catch((err) => {
          errorHandlers(err.status, loginServer, userData);
        });
    }
  };
  const RedirectTemporaryPass = () => {
    naviagte('/pass')
  }
  
  const naviagte = useNavigate();

  const handleRegist = () => {
    naviagte('/signup')
  }

  const RedirectHomePage = () => {
    naviagte('/home');
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <StyledLink to='/home' aria-label="로그인 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요" >
        <SimpleTitle imgSrc="SimpleLogo" aria-label="" aria-live="assertive"/>
      </StyledLink>
      <div id='RegisterContainer'>
      <Input
        type="email"
        alt="Input Email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="이메일을 입력하세요"
      />

      <Input
      alt="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="비밀번호를 입력하세요"
      />

      <LoginButton text='비밀번호를 잊으셨나요?' onClick={RedirectTemporaryPass} aria-label="비밀번호 찾기 버튼입니다. 비밀번호 찾기 페이지로 이동합니다."/> 

      <LoginButton text='로그인' onClick={handleLogin} aria-label="로그인 버튼입니다."/>

      <LoginButton text='회원가입' onClick={handleRegist} aria-label="회원가입 페이지로 이동하는 버튼입니다."/>
      </div>
    </>
  );
};

export default SimpleLogin;