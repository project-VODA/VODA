import React, { useState } from 'react';

import Title from '../../components/Title';

import Input from '../../components/InputText';
import RegisterButton from '../../components/RegisterButton';
import CheckBox from '../../components/CheckBox';


const SimpleSignup = () => {
  const [isDisabled, setIsDisabled] = useState(false); // 장애 여부 체크 상태를 state로 관리

  return (
    <>
      <Title title='회원가입'/>
      
      <Input placeholder="이메일" />
      <Input placeholder="이름" />
      <Input placeholder="비밀번호" />
      <Input placeholder="비밀번호 확인" />
      <Input placeholder="전화번호" />

      <CheckBox
        label="장애 여부" // 체크박스 옆에 표시될 텍스트
        checked={isDisabled} // 체크 여부를 state로 전달
        onChange={(checked) => setIsDisabled(checked)} // 체크 상태가 변경될 때 state 업데이트
      />

      <RegisterButton text='회원가입' />
    </>
  );
};

export default SimpleSignup;


