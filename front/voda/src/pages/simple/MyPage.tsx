import React from 'react';
import styled from 'styled-components';

import Title from '../../components/Title';

import Input from '../../components/Input';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const RedSettingButton = styled(SettingButton)`
  background-color: red;
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
  
  return (
    <>
      <Title title='마이페이지' />

      <Input placeholder="이메일" />
      <Input placeholder="이름" />
      <Input placeholder="비밀번호" />
      ------------------------------------ 안내 설정
      <Input placeholder="장애 여부" />

      <ButtonContainer>
        <SettingButton text='정보 수정' />
        <SettingButton text='비밀번호 변경' />
        <DeleteButton text='회원 탈퇴' />
      </ButtonContainer>
    </>
  );
};

export default SimpleMyPage;
