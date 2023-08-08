import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import SimpleTitle from '../../components/SimpleTitle';
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

// import '../../styles/simple/EnvSettingPage.css'

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
      <StyledLink to='/home' aria-label='환경 설정 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요.'>
        <SimpleTitle imgSrc="SimpleLogo" aria-label='환경 설정 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요.' />
      </StyledLink>

      <div>
        <div className='alarmContainer'>
          <p className='alarmTitle' aria-label='알림을 선택하세요. 남자, 여자 목소리, 조언을 선택 가능합니다. 탭을 누르신 후 선택됨 음성이 나오면 위 아래 방향키로 선택하세요' tabIndex={0}>알림 설정</p>
        <div>
          <label >
            <input
              type='radio'
              name='typeNo'
              value='0'
              checked={notificationType === 0}
              onChange={() => setNotificationType(0)}
              aria-label='남자 목소리'
              tabIndex={0}
            />
            남자 목소리
          </label>
        </div>
        <div className='chooseAlarm'>
          <label >
            <input
              type='radio'
              name='typeNo'
              value='1'
              checked={notificationType === 1}
              onChange={() => setNotificationType(1)}
              aria-label='여자 목소리'
              tabIndex={0}
            />
            여자 목소리
          </label>
        </div>
        <div>
          <label >
            <input
              type='radio'
              name='typeNo'
              value='2'
              checked={notificationType === 2}
              onChange={() => setNotificationType(2)}
              aria-label='음성과 상황에 맞는 조언'
              tabIndex={0}
            />
            음성 & 조언
          </label>
        </div>
      </div>
      </div>
      
      <div className='modeContainer'>
        <div className='modeTitle' aria-label='모드를 설정할 수 있습니다. 탭 키를 누른 후 선택됨 음성이 나오면 위 아래 방향키로 선택하세요.' tabIndex={0}>모드 설정</div>
      <div className='chooseMode'>
        <div>
          <label  >
            <input
              type='radio'
              name='screenMode'
              value='detail'
              checked={screenMode === 0}
              onChange={() => setScreenMode(0)}
              aria-label='디테일 모드'
              tabIndex={0}
            />
            디테일 모드
          </label>
        </div>
        <div>
          <label >
            <input
              aria-label='심플 모드'
              type='radio'
              name='screenMode'
              value='simple'
              checked={screenMode === 1}
              onChange={() => setScreenMode(1)}
              tabIndex={0}
            />
            심플 모드
          </label>
        </div>
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



