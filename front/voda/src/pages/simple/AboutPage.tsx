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
      <SimpleTitle tabIndex={0} imgSrc="SimpleLogo" />
    </StyledLink>
      <p className="aboutTitle" aria-label="영상통화중 표정 알림 서비스" tabIndex={1}>영상통화중 표정 알림 서비스</p>
      <p className="aboutContent" aria-label="VODA는 웹 브라우저에서 시각 장애인에게 비언어적 소통을 지원합니다. 사랑하는 지인 및 가족과 손쉽게 영상 통화를 시작해보세요." tabIndex={2}>
        VODA는 웹 브라우저에서 시각 장애인에게 비언어적 소통을 지원합니다.<br/>사랑하는 지인 및 가족과 손쉽게 영상 통화를 시작해보세요.
        </p>
    <div><p className="aboutVODA" aria-label="보다" tabIndex={3}>VODA <br/>
      <p className="aboutMean" aria-label="Voice Over Diverse Assistance" tabIndex={4}>
      Voice <br/>
      Over <br/>
      Diverse <br/>
      Assistance <br/></p>
    </p><p className="aboutSlogan" aria-label="표정을 소리로 보다" tabIndex={5}>"표정"을 "소리"로 보다</p></div>
    {/* <p role="text" aria-label="표정을 소리로 보다" tabIndex={0}>"표정"을 "소리"로 보디</p> */}
    </>
  );
};

export default SimpleAbout;
