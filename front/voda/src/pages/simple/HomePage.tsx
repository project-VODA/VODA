import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SimpleTitle from '../../components/SimpleTitle';
import HandleButton from '../../components/HandleBtn';
import { useAppSelector } from '../../hooks/reduxHook';
import useLogOut from '../../hooks/useLogout';
import WeatherCurrentSimple from '../../components/weather/WeatherCurrentSimple';

const PageContainer = styled.div`
  position: relative;
  height: 100vh;
`;

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

const WeatherContainer = styled.div`
  position: relative;
  bottom: -5%;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
`;

const SimpleHomePage = () => {

  const navigate = useNavigate();
  const logout = useLogOut();
  const isLogin = useAppSelector((state) => state.user.isLogin);

  // const RedirectSocialLogin = () => {
  //   navigate('/social-login');
  // };

  // const handleSocialLogin = () => {
  //   // navigate('/social-login');
  //   redirectKakao();
  // };

  const redirectAbout = () => {
    navigate('/about')
  };

  const redirectVideo = () => {
    navigate('/waiting')
  };

  const redirectMyPage = () => {
    navigate('/mypage')
  };

  const redirectLogin = () => {
    navigate('/login')
  };

  const redirectFeedback = () => {
    navigate('/feedback')
  };


  const redirectColor = () => {
    navigate('/color')
  }

  
  //로그인 여부 확인
  //const accessToken = sessionStorage.getItem("accessToken");

  return (
    <PageContainer>
      <StyledLink to='/home' aria-label='홈페이지입니다.'>
        <SimpleTitle tabIndex={0} imgSrc='SimpleLogo' aria-live='assertive' aria-label='홈페이지입니다.'/>
      </StyledLink>
      <ButtonContainer>
        <HandleButton tabIndex={1} text='서비스 소개' onClick={redirectAbout} />
        <HandleButton tabIndex={2} text='영상통화' onClick={redirectVideo} />
        <HandleButton tabIndex={3} text="색상 인식" onClick={redirectColor} />
        <HandleButton tabIndex={4} text="고객의 소리함" onClick={redirectFeedback} />
        {/* <HandleButton text='redirect' onClick={RedirectSocialLogin} /> */}
        {/* <HandleButton text='카카오 로그인' onClick={handleSocialLogin} /> */}
        <HandleButton tabIndex={5}text='마이 페이지' onClick={redirectMyPage} />
        {/* 로그인 유저 존재 여부에 따라 버튼 렌더링 */}
        {isLogin ? (
          <HandleButton tabIndex={6} text="로그아웃" onClick={logout} />
          ) : (
          <HandleButton tabIndex={6} text="로그인" onClick={redirectLogin} />
        )}
      </ButtonContainer>
      <WeatherContainer>
        <WeatherCurrentSimple/>
      </WeatherContainer>
    </PageContainer>
  );
};

export default SimpleHomePage;
