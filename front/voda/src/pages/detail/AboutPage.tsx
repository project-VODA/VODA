import React from "react";
import Hovering from "../../components/AboutHover";
import Title from "../../components/Title";
import logo_black from '../../assets/images/logo_black.png'
import styled from "styled-components";
// import Footer from "../../components/AboutFooter"

import "../../styles/detail/DetailAbout.css"
import "../../styles/detail/AboutHover.css"

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const AboutHover = () => {
  return (
    <>
    <StyledContainer>
      <RelativeContainer>
        <div className="AllContainer">
          <Title className="DetAboutTitle" title='"표정"을 "소리"로 보다.'/>
          <Hovering className="AboutHovering"/> <br/>
          <img className="AboutLogo" src={logo_black} alt="왜안보일까요?" style={{ width: "20vw", height: "auto" }}/>
          {/* <span className="DetSlogan">"표정"을 "소리"로 보다.</span> */}
          <span className="DetAboutMean">
            V  oice <br/>
            O  ver <br/>
            D  iverse <br/>
            A  ssistance <br/></span>
        </div>
      </RelativeContainer>
    </StyledContainer>
    </>
  );
};

export default AboutHover;
