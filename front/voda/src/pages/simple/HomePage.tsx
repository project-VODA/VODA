import React , { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Title from '../../components/Title';
import NavButton from '../../components/NavButton';
import HandleButton from '../../components/HandleBtn';
import { redirectKakao, logout } from '../../apis/user';
import { useState } from "react";


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
  }

  const naviagte = useNavigate();

  const RedirectHomePage = () => {
    naviagte('/');
  }
  
  //로그인 여부 확인
  const accessToken = sessionStorage.getItem("accessToken");

  return (
    <>
      <Title title='Homepage' />
      <ButtonContainer>
        <NavButton text="서비스 소개" to="/about" />
        <NavButton text="영상 통화" to='/video' />
        <NavButton text="마이 페이지" to='/mypage' />
        <HandleButton text='redirect' onClick={RedirectSocialLogin} />
        <HandleButton text='소셜 로그인/카카오' onClick={handleSocialLogin} />

        {/* 로그인 유저 존재 여부에 따라 버튼 렌더링 */}
        {accessToken !== null ? (
          <HandleButton text="로그아웃" onClick={handleLogout} />
          ) : (
          <NavButton text="로그인" to="/login" />
        )}
      </ButtonContainer>

      {/* Add other content for the home page */}
    </>
  );
};

export default SimpleHomePage;
