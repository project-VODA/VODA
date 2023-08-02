import React , { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Title from '../../components/Title';
import HandleButton from '../../components/HandleBtn';
import { redirectKakao, logout } from '../../apis/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { userSliceLogout } from '../../store/userSlice';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimpleHomePage = () => {

  const navigate = useNavigate();
  const accessToken = useSelector((state:RootState) => {
    return state.user.accessToken;
  })

  const isLogin = useSelector((state:RootState) => {
    return state.user.isLogin;
  })

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

  const handleLogout = () => {
    if(accessToken !== null && accessToken !== ''){
      logout()
      .then((res) => {
        userSliceLogout();
        RedirectHomePage();
      })
      .catch((err) => {
        console.log(err);
      })
    }
  };

  const naviagte = useNavigate();

  const RedirectHomePage = () => {
    naviagte('/');
  };
  
  //로그인 여부 확인
  //const accessToken = sessionStorage.getItem("accessToken");

  return (
    <>
      <Title title='Homepage' />
      <ButtonContainer>
        <HandleButton text='서비스 소개' onClick={redirectAbout} />
        <HandleButton text='영상통화' onClick={redirectVideo} />
        <HandleButton text='마이 페이지' onClick={redirectMyPage} />
        {/* <HandleButton text='redirect' onClick={RedirectSocialLogin} /> */}
        <HandleButton text='카카오 로그인' onClick={handleSocialLogin} />
        <HandleButton text="고객의 소리함" onClick={redirectFeedback} />

        {/* 로그인 유저 존재 여부에 따라 버튼 렌더링 */}
        {isLogin ? (
          <HandleButton text="로그아웃" onClick={handleLogout} />
          ) : (
          <HandleButton text="로그인" onClick={redirectLogin} />
        )}
      </ButtonContainer>
    </>
  );
};

export default SimpleHomePage;
