import React from "react";

import Title from '../../components/Title';

import Input from '../../components/Input';
import LoginButton from '../../components/LoginButton';
import RegisterButton from '../../components/RegisterButton';

const SimpleSignup = () => {
  return (
    <>
      <Title title='회원가입'/>
      
      <Input placeholder="이메일" />
      <Input placeholder="이름" />
      <Input placeholder="비밀번호" />
      <Input placeholder="비밀번호 확인" />
      <Input placeholder="전화번호" />

      <LoginButton />
      <RegisterButton />
    </>
  );
};

export default SimpleSignup;


