import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Title from '../../components/Title';
import NavButton from '../../components/NavButton';
import HandleButton from '../../components/HandleBtn';
import { redirectKakao } from '../../apis/user';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;

`;

const SimpleHomePage = () => {
  const navigate = useNavigate();

  const RedirectSocialLogin = () => {
    navigate('/social-login');
  };

  const handleSocialLogin = () => {
    // navigate('/social-login');
    redirectKakao();
  };

  
  return (
    <>
      <Title title='Homepage' />
      <ButtonContainer>
        <NavButton text="서비스 소개" to="/about" />
        <NavButton text="영상 통화" to='/video' />
        <NavButton text="마이 페이지" to='/mypage' />
        <HandleButton text='redirect' onClick={RedirectSocialLogin} />
        <HandleButton text='소셜 로그인/카카오' onClick={handleSocialLogin} />
        <NavButton text="로그인" to='/login' />
      </ButtonContainer>

      {/* Add other content for the home page */}
    </>
  );
};

export default SimpleHomePage;
