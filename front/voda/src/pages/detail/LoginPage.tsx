import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from 'react-router-dom';

import { loginServer } from "../../apis/user";

import Title from '../../components/Title';
import Input from '../../components/SubmitInputText';
import LoginButton from '../../components/RegisterButton';
import Link from "../../components/TextLink";
import { useDispatch } from "react-redux";
import { userSliceLogin } from "../../store/userSlice";

const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userData = {
    userEmail: email,
    userPass: password,
  };

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
          dispatch(userSliceLogin({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          }));
          // 메인페이지로 리다이렉트
          RedirectHomePage();
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 401 || err.response.status === 404) {
            alert("가입되지 않은 이메일이거나 비밀번호가 틀렸습니다.");
            setEmail('');
            setPassword('');
          } else if (err.response.status === 500) {
            alert("로그인 실패 (서버 에러)");
            setEmail('');
            setPassword('');
          }
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
      <Title title='로그인' />

      <Input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <Link text='비밀번호를 잊으셨나요?' onClick={RedirectTemporaryPass}/> 

      <LoginButton text='로그인' onClick={handleLogin} />

      <LoginButton text='회원가입' onClick={handleRegist} aria-label="회원가입 페이지로 이동하는 버튼입니다."/>
    </>
  );
};

export default SimpleLogin;