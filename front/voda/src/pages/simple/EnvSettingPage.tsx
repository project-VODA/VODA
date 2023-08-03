import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Title from '../../components/Title';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';
import { cancelUser, changePassword, getUserInfo, logout, updateUserInfo } from '../../apis/user';
import Info from '../../components/InfoText';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserInfoType, userSliceLogout } from '../../store/userSlice';
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


const SimpleEnvSettingPage = () => {
  // redux에서 저장된 정보 가져오기
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })
  // 컴포넌트 지역 변수에 연결

  const naviagte = useNavigate();

  const RedirectHomePage = () => {
    naviagte('/');
  }

  const handleModify = () => {
    
  }

  return (
    <>
      <StyledLink to='' aria-label='환경 설정 페이지입니다.'>
        <Title title='환경설정' aria-label='환경 설정 페이지입니다.'/>
      </StyledLink>
      {/* <Input 
        type="radio"
      />
      <Input 
        type="password"
        placeholder="새 비밀번호 확인" 
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
        aria-label='비밀번호 확인 칸입니다. 작성하신 비밀번호를 한번 더 입력해주세요.'
      /> */}
      <ButtonContainer>
        <SettingButton text='설정 변경' onClick={handleModify} aria-label='설정 변경 버튼입니다.'/>
      </ButtonContainer>
    </>
  );
};

export default SimpleEnvSettingPage;
