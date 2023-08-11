import React , { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SimpleTitle from '../../components/SimpleTitle';
import HandleButton from '../../components/HandleBtn';
import { redirectKakao, logout } from '../../apis/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { userSliceLogout } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import useLogOut from '../../hooks/useLogout';

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

const SimpleHomePage = () => {

  const navigate = useNavigate();
  const logout = useLogOut();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const screenType = useAppSelector((state) => state.user.userSetting.screenType);

  useEffect(() => {
    localStorage.setItem('theme', screenType === 0 ? 'DetailTheme' : 'SimpleTheme');
  }, [])

  const RedirectSocialLogin = () => {
    navigate('/social-login');
  };

  const handleSocialLogin = () => {
    // navigate('/social-login');
    redirectKakao();
  };

  const redirectAbout = () => {
    navigate('/about')
  };

  const redirectVideo = () => {
    navigate('/waiting')
    // navigate('/video')
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

  const redirectEnvPage = () => {
    navigate('/setting')
  };

  const RedirectHomePage = () => {
    navigate('/');
  };
  
  //로그인 여부 확인
  //const accessToken = sessionStorage.getItem("accessToken");

  return (
    <>
    <StyledLink to='/home' aria-label='홈페이지입니다.'>
      <SimpleTitle tabIndex={0} imgSrc='SimpleLogo' aria-live='assertive' aria-label='홈페이지입니다.'/>
    </StyledLink>
      <ButtonContainer>
        <HandleButton tabIndex={1} text='서비스 소개' onClick={redirectAbout} />
        <HandleButton tabIndex={2} text='영상통화' onClick={redirectVideo} />
        <HandleButton tabIndex={3} text="고객의 소리함" onClick={redirectFeedback} />
        <HandleButton tabIndex={4}text='마이 페이지' onClick={redirectMyPage} />
        {/* <HandleButton text='redirect' onClick={RedirectSocialLogin} /> */}
        {/* <HandleButton text='카카오 로그인' onClick={handleSocialLogin} /> */}
        <HandleButton text="환경 설정" onClick={redirectEnvPage} />
        {/* 로그인 유저 존재 여부에 따라 버튼 렌더링 */}
        {isLogin ? (
          <HandleButton tabIndex={5} text="로그아웃" onClick={logout} />
          ) : (
          <HandleButton tabIndex={5} text="로그인" onClick={redirectLogin} />
        )}
      </ButtonContainer>
    </>
  );
};

export default SimpleHomePage;
