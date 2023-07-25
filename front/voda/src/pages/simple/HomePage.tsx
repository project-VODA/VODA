import React from 'react';
import styled from 'styled-components';

import Title from '../../components/Title';
import NavButton from '../../components/NavButton';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;

`;

const SimpleHomePage = () => {
  return (
    <>
      <Title title='Homepage' />
      <ButtonContainer>
        <NavButton text="서비스 소개" to="/about" />
        <NavButton text="영상 통화" to='/video' />
        <NavButton text="마이 페이지" to='/mypage' />
        <NavButton text="로그인" to='/social-login' />
      </ButtonContainer>

      {/* Add other content for the home page */}
    </>
  );
};

export default SimpleHomePage;
