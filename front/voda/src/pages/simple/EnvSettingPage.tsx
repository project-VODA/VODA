import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Title from '../../components/Title';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';
import { cancelUser, changePassword, getUserInfo, logout, updateUserInfo, updateUserSetting } from '../../apis/user';
import Info from '../../components/InfoText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserInfoType, UserSettingType, userSliceLogout } from '../../store/userSlice';
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
  const [accessToken, userInfo, userSetting]: [string, UserInfoType, UserSettingType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo, state.user.userSetting];
  })
  const [notificationType, setNotificationType] = useState(userSetting.typeNo);
  const [screenMode, setScreenMode] = useState(userSetting.screenType);

  const userSettingRequest = {
    userEmail: userInfo.userEmail,
    usersettingTypeNo: notificationType,
    usersettingScreenType: screenMode,
  };

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const RedirectHomePage = () => {
    naviagte('/home');
  }

  const handleModify = () => {
    updateUserSetting(userSettingRequest)
      .then((res) => {
        console.log(res);
        // 로그아웃 처리
        if(accessToken !== null && accessToken !== ''){
          logout()
          .then((res) => {
            dispatch(userSliceLogout());
            RedirectHomePage();
          })
          .catch((err) => {
            console.log(err);
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <>
      <StyledLink to='' aria-label='환경 설정 페이지입니다.'>
        <Title title='환경설정' aria-label='환경 설정 페이지입니다.' />
      </StyledLink>

      <div>
        <div>
          <label>
            <input
              type='radio'
              name='typeNo'
              value='0'
              checked={notificationType === 0}
              onChange={() => setNotificationType(0)}
            />
            알림음
          </label>
        </div>
        <div>
          <label>
            <input
              type='radio'
              name='typeNo'
              value='1'
              checked={notificationType === 1}
              onChange={() => setNotificationType(1)}
            />
            음성
          </label>
        </div>
        <div>
          <label>
            <input
              type='radio'
              name='typeNo'
              value='2'
              checked={notificationType === 2}
              onChange={() => setNotificationType(2)}
            />
            음성 & 조언
          </label>
        </div>
      </div>
      
      <div>
        <div>
          <label>
            <input
              type='radio'
              name='screenMode'
              value='detail'
              checked={screenMode === 0}
              onChange={() => setScreenMode(0)}
            />
            디테일 모드
          </label>
        </div>
        <div>
          <label>
            <input
              type='radio'
              name='screenMode'
              value='simple'
              checked={screenMode === 1}
              onChange={() => setScreenMode(1)}
            />
            심플 모드
          </label>
        </div>
      </div>

      <ButtonContainer>
        <SettingButton
          text='설정 변경'
          onClick={handleModify}
          aria-label='설정 변경 버튼입니다.'
        />
      </ButtonContainer>
    </>
  );
};

export default SimpleEnvSettingPage;



