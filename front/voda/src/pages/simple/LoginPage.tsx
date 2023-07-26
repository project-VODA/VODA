import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { loginServer } from "../../apis/user";

import Title from '../../components/Title';
import Input from '../../components/InputText';
import LoginButton from '../../components/RegisterButton';

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

      <LoginButton text='로그인' onClick={handleLogin} />
    </>
  );
};

export default SimpleLogin;