import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


import Title from '../components/Title';
import LandingButton from '../components/LandingBtn';
import { Link } from "react-router-dom";
import '../styles/simple/common.css'


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
  width: 100%
`;


const LandingPage = () => {
  const navigate = useNavigate();
  
  const simpleModeClick = () => {
    window.localStorage.setItem('theme', 'simple')
    // const localTheme = window.localStorage.getItem('theme');
    //   if (localTheme === 'detail') {
    //     toggleTheme();
    //   }
    navigate('/home');
    window.location.reload()
  };

  const detailModeClick = () => {
    window.localStorage.setItem('theme', 'detail')
    // const localTheme = window.localStorage.getItem('theme');
    //   if (localTheme === 'simple') {
    //     toggleTheme();
    //   }
    //   navigate('/home');
    navigate('/home');
    window.location.reload()
  };

  return (
    <>
      <StyledLink to='' aria-label="테마를 선택하는 페이지입니다. 시각 장애인을 배려한 심플 모드와 비장애인을 위한 디테일 모드가 있습니다.">
        <Title title='LandingPage' />
      </StyledLink>
      <ButtonContainer>
        <LandingButton text='SimpleMode' onClick={simpleModeClick} aria-label="심플 모드 적용" />
        <LandingButton text='DetailMode' onClick={detailModeClick} aria-label="디테일 모드 적용"/>
      </ButtonContainer>
    </>
  );
};

export default LandingPage
