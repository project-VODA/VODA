import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { loginServer } from "../../apis/user";

import Title from '../../components/Title';
import Input from '../../components/InputText';
import LoginButton from '../../components/RegisterButton';
import Link from "../../components/TextLink";

const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    userEmail: email,
    userPass: password,
  };

  const handleLogin = () => {

    loginServer(userData)
      .then((res) => {
        if (res.user.userEmail === userData.userEmail){
          alert("로그인 성공");
          // 세션에 유저 정보 저장
          sessionStorage.setItem("userEmail", res.user.userEmail);
          sessionStorage.setItem("userName", res.user.userName);
          sessionStorage.setItem("userHandicap", res.user.userHandicap);
          sessionStorage.setItem("accessToken", res.accessToken);
          sessionStorage.setItem("refreshToken", res.refreshToken);

          // 메인페이지로 리다이렉트
          RedirectHomePage();
        }else {
          alert("가입되지 않은 이메일이거나 비밀번호가 틀렸습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });

  };
  const RedirectTemporaryPass = () => {
    naviagte('/pass')
  }
  
  const naviagte = useNavigate();

  const RedirectHomePage = () => {
    naviagte('/');
  }

  return (
    <>
      <Title title='로그인'/>

      <Input 
        type="email"
        placeholder="이메일을 입력하세요" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input 
          type="password"
          placeholder="비밀번호" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
      />

      <Link text='비밀번호를 잊으셨나요?' onClick={RedirectTemporaryPass}/> 

      <LoginButton text='로그인' onClick={handleLogin} />
    </>
  );
};

export default SimpleLogin;