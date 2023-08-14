import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import SimpleTitle from '../../components/SimpleTitle';
import ModifyButton from '../../components/RegisterButton';
import { updateUserSetting } from '../../apis/user';
import { Link } from "react-router-dom";

import '../../styles/simple/EnvSettingPage.css'
import { useAppSelector } from '../../hooks/reduxHook';
import useLogOut from '../../hooks/useLogout';
import useErrorHandlers from '../../hooks/useError';

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
  const {userInfo, userSetting} = useAppSelector((state) => state.user);
  const [notificationType, setNotificationType] = useState(userSetting.usersettingTypeNo);
  const [screenMode, setScreenMode] = useState(userSetting.usersettingScreenType);

  const userSettingRequest = {
    userEmail: userInfo.userEmail,
    usersettingTypeNo: notificationType,
    usersettingScreenType: screenMode,
  };

  const naviagte = useNavigate();
  const logout = useLogOut();
  const errorHandlers = useErrorHandlers();

  const handleModify = () => {
    updateUserSetting(userSettingRequest)
      .then((res) => {
        logout();
      })
      .catch((err) => {
        errorHandlers(err.response, handleModify);
      })
  }

  return (
    <>
      <StyledLink to='/home' aria-label='환경 설정 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요.'>
        <SimpleTitle tabIndex={0} imgSrc="SimpleLogo" aria-label='환경 설정 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요.' />
      </StyledLink>


        <div className='allContainerS'>
          <div className='alarmContainerS'>
            <p className='alarmTitleS' aria-label='알림을 선택하세요. 남자, 여자 목소리, 조언을 선택 가능합니다.' tabIndex={1}>알림 설정</p>
            <div className='chooseAlarmS'>
            <div style={{ marginTop:'70px' }}>
              <label tabIndex={2}>
                <input
                  type='radio'
                  name='typeNo'
                  value='0'
                  checked={notificationType === 0}
                  onChange={() => setNotificationType(0)}
                  aria-label='남자 목소리'
                  style={{ width: '20px', height: '20px' }}
                />
                남자 목소리
              </label>
            </div>
            <div style={{ marginTop:'20px' }}>
              <label tabIndex={3}>
                <input
                  type='radio'
                  name='typeNo'
                  value='1'
                  checked={notificationType === 1}
                  onChange={() => setNotificationType(1)}
                  aria-label='여자 목소리'
                  style={{ width: '20px', height: '20px' }}
                />
                여자 목소리
              </label>
            </div>
            <div style={{ marginTop:'20px' }}>
              <label tabIndex={4}>
                <input
                  type='radio'
                  name='typeNo'
                  value='2'
                  checked={notificationType === 2}
                  onChange={() => setNotificationType(2)}
                  aria-label='남성음성과 상황에 맞는 조언'
                  style={{ width: '20px', height: '20px' }}
                />
                남성음성 & 조언
              </label>
            </div>
            <div style={{ marginTop:'20px' }}>
              <label tabIndex={5}>
                <input
                  type='radio'
                  name='typeNo'
                  value='2'
                  checked={notificationType === 3}
                  onChange={() => setNotificationType(3)}
                  aria-label='여성음성과 상황에 맞는 조언'
                  style={{ width: '20px', height: '20px' }}
                />
                여성음성 & 조언
              </label>
            </div>
            <div style={{marginTop: '20px'}}></div>
          </div>
        </div>
      


      <div className='modeContainerS'>
        <div className='modeTitleS' aria-label='모드를 설정할 수 있습니다.' tabIndex={6}>모드 설정</div>
          <div className='chooseModeS'>
            <div style={{ marginTop:'70px' }}>
              <label  tabIndex={7}>
                <input
                  type='radio'
                  name='screenMode'
                  value='detail'
                  checked={screenMode === 0}
                  onChange={() => setScreenMode(0)}
                  aria-label='디테일 모드'
                  style={{ width: '20px', height: '20px' }}
                />
              디테일 모드
              </label>
            </div>
            <div style={{ marginTop:'20px' }}>
              <label tabIndex={8} >
                <input
                  aria-label='심플 모드'
                  type='radio'
                  name='screenMode'
                  value='simple'
                  checked={screenMode === 1}
                  onChange={() => setScreenMode(1)}
                  style={{ width: '20px', height: '20px' }}
                />
              심플 모드
              </label>
            </div>
            <div style={{marginTop: '20px'}}></div>
          </div>
        </div>
      </div>

      <ButtonContainer style={{ margin:'50px 0 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto' }}>
        <ModifyButton 
          className='modifyButton'
          text='설정 변경'
          onClick={handleModify}
          aria-label='설정 변경 버튼입니다.'
          style={{ width: '250px', height: '56px'}}
          tabIndex={9}
        />
      </ButtonContainer>
    </>
  );
};

export default SimpleEnvSettingPage;



