import React from "react";

import Title from '../../components/Title';

import Input from '../../components/Input';
// import LoginButton from '../../components/LoginButton';
import RegisterButton from '../../components/RegisterButton';

const SimpleLogin = () => {
  return (
    <>
      <Title title='로그인'/>
      
      <Input placeholder="이메일을 입력하세요" />

      <Input placeholder="비밀번호를 입력하세요" />

      <RegisterButton text='로그인' />
      <RegisterButton text='회원가입' />
    </>
  );
};

export default SimpleLogin;


