import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


import SimpleTitle from '../components/SimpleTitle';
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
  

  const theme = window.localStorage.getItem('theme');
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
     {localStorage.getItem('theme') === 'simple' ? (<StyledLink to='' aria-label="테마를 선택하는 페이지입니다. 시각 장애인을 배려한 심플 모드와 비장애인을 위한 디테일 모드가 있습니다.">
        <SimpleTitle imgSrc="SimpleLogo" />
      </StyledLink>): (<div style={{ height: '10.2vh' }}></div>)}
      
      <ButtonContainer>
        <LandingButton text='심플 모드' onClick={simpleModeClick} aria-label="심플 모드 적용" />
        <LandingButton text='디테일 모드' onClick={detailModeClick} aria-label="디테일 모드 적용"/>
      </ButtonContainer>
    </>
  );
};

export default LandingPage
