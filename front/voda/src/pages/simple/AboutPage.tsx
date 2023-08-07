import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Title from '../../components/Title';

import '../../styles/simple/About.css'
import SimpleTitle from "../../components/SimpleTitle";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SimpleAbout = () => {
  return (
    <>
    <StyledLink to='/home' aria-label="서비스 소개 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요">
      <SimpleTitle imgSrc="SimpleLogo" />
    </StyledLink>
    <StyledLink to='' aria-label="서비스 소개 페이지입니다. 영상통화 중 표정 알림 서비스">
      <div className="aboutTitle">영상통화중 표정 알림 서비스</div>
    </StyledLink>
    <StyledLink to='' aria-label="보다는 웹 브라우저에서 시각 장애인에게 비언어적 소통을 지원합니다. 사랑하는 지인 및 가족과 손쉽게 영상 통화를 시작해보세요.">
      <div className="aboutContent">VODA는 웹 브라우저에서 시각 장애인에게 비언어적 소통을 지원합니다.<br/>사랑하는 지인 및 가족과 손쉽게 영상 통화를 시작해보세요.</div>
    </StyledLink>
    <StyledLink to='' aria-label="Voice Over 다이verse Assistance. VODA, 표정을 소리로 보다.">
    <div><span className="aboutVODA">VODA <br/>
      <span className="aboutMean">
      V  oice <br/>
      O  ver <br/>
      D  iverse <br/>
      A  ssistance <br/></span>
    </span><span className="aboutSlogan">"표정"을 "소리"로 보다</span></div></StyledLink>
    </>
  );
};

export default SimpleAbout;
