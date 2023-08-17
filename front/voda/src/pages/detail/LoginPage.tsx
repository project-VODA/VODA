import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from 'react-router-dom';

import { userSliceLogin } from "../../store/userSlice";

import { loginServer } from "../../apis/user";
import { Link as TitleLink } from "react-router-dom" ;
import SimpleTitle from '../../components/SimpleTitle';
import Input from '../../components/SubmitInputText';
import LoginButton from '../../components/RegisterButton';

import '../../styles/simple/RegisterContainer.css'
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/reduxHook";
import { HttpStatusCode } from "axios";

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
  const navigate = useNavigate();

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
          dispatch(userSliceLogin (res));
          localStorage.setItem('theme', res.userSetting.screenType === 0 ? "detail" : "simple");
          console.log("스크린타입: " + res.userSetting.screenType);
          // 메인페이지로 리다이렉트
          RedirectHomePage();
        })
        .catch((err) => {
          if(err.response === undefined){
            navigate('/error');
            return;
          }
          handleError(err.response.status);
        });
    }
  };
  const RedirectTemporaryPass = () => {
    navigate('/pass')
  }
  
  const handleRegist = () => {
    navigate('/signup')
  }

  const RedirectHomePage = () => {
    navigate('/home');
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleError = (statusCode: HttpStatusCode | undefined) => {
    switch(statusCode){
      case HttpStatusCode.Unauthorized:
        alert("이메일과 비밀번호를 확인해주세요");
        break;
      default:
        navigate('/error');
    }
  }

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