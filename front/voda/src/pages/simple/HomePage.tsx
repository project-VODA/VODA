import React , { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Title from '../../components/Title';
import HandleButton from '../../components/HandleBtn';
import { redirectKakao, logout } from '../../apis/user';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimpleHomePage = () => {
  //임시 유저 정보 확인용
  useEffect(() => {
    console.log(sessionStorage.getItem("userEmail"))
    console.log(sessionStorage.getItem("userName"))
    console.log(sessionStorage.getItem("accessToken"))
    console.log(sessionStorage.getItem("refreshToken"))
  })

  const navigate = useNavigate();

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
    navigate('/video')
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
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    if(token!==null && token!==''){
      console.log(token);
      logout(token)
      .then((res) => {
        console.log(res);
        sessionStorage.clear();
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
  const accessToken = sessionStorage.getItem("accessToken");

  return (
    <>
      <Title title='Homepage' />
      <ButtonContainer>
        <HandleButton text='서비스 소개' onClick={redirectAbout} aria-label='서비스 소개 버튼'/>
        <HandleButton text='영상통화' onClick={redirectVideo} aria-label='영상 통화 버튼'/>
        <HandleButton text='마이 페이지' onClick={redirectMyPage} aria-label='마이 페이지 버튼'/>
        {/* <HandleButton text='redirect' onClick={RedirectSocialLogin} /> */}
        <HandleButton text='카카오 로그인' onClick={handleSocialLogin} aria-label='카카오 로그인 버튼'/>
        <HandleButton text="고객의 소리함" onClick={redirectFeedback} aria-label='고객의 소리함 버튼'/>

        {/* 로그인 유저 존재 여부에 따라 버튼 렌더링 */}
        {accessToken !== null ? (
          <HandleButton text="로그아웃" onClick={handleLogout} aria-label='로그아웃 버튼'/>
          ) : (
          <HandleButton text="로그인" onClick={redirectLogin} aria-label='로그인 버튼'/>
        )}
      </ButtonContainer>
    </>
  );
};

export default SimpleHomePage;
