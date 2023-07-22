import React, { useState } from 'react';
import styled from 'styled-components';

import Title from '../../components/Title';

import Input from '../../components/Input';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


const SimpleMyPage = () => {

  // const isLoggedIn = false;
  // if (!isLoggedIn) {
  //   return (
  //     <Navigate
  //       to="/login"
  //       replace={true}
  //     />
  //   );
  // }
  const [isDisabled, setIsDisabled] = useState(false); // 장애 여부 체크 상태를 state로 관리

  return (
    <>
      <Title title='마이페이지' />

      <Input placeholder="이메일" />
      <Input placeholder="이름" />
      <Input placeholder="비밀번호" />
      <CheckBox
        label="장애 여부" // 체크박스 옆에 표시될 텍스트
        checked={isDisabled} // 체크 여부를 state로 전달
        onChange={(checked) => setIsDisabled(checked)} // 체크 상태가 변경될 때 state 업데이트
      />

      <ButtonContainer>
        <SettingButton text='정보 수정' />
        <SettingButton text='비밀번호 변경' />
        <DeleteButton text='회원 탈퇴' />
      </ButtonContainer>
    </>
  );
};

export default SimpleMyPage;
