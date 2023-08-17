import React, { useState, useEffect } from "react";
import Hovering from "../../components/AboutHover";
import Title from "../../components/Title";
import logo_black from '../../assets/images/logo_black.png'
import styled from "styled-components";

import "../../styles/detail/DetailAbout.css"
import "../../styles/detail/AboutHover.css"

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const AboutHover = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener( "resize", handleResize );
  }, []);
  if (isMobile) {
  return (
    <>
    <StyledContainer>
      <RelativeContainer>
        <div className="AllContainer">
          <div>
          <Title className="DetAboutTitle" title='"표정"을 "소리"로 보다.'/>
          {isMobile && <Hovering className="AboutHovering"/>}
          {!isMobile && <Hovering className="AboutHovering"/>}
          </div> <br/>
          <div>
          <img className="AboutLogo" src={logo_black} alt="왜안보일까요?" style={{ width: "50%", height: "auto" }}/>
          <span className="DetAboutMean">
            V  oice <br/>
            O  ver <br/>
            D  iverse <br/>
            A  ssistance <br/></span>
            </div>
        </div>
      </RelativeContainer>
    </StyledContainer>
    </>
  );
}
return (
  <>
    <StyledContainer>
      <RelativeContainer>
        <div className="AllContainer">
          <Title className="DetAboutTitle" title='"표정"을 "소리"로 보다.'/>
          {isMobile && <Hovering className="AboutHovering"/>}
          {!isMobile && <Hovering className="AboutHovering"/>} <br/>
          <img className="AboutLogo" src={logo_black} alt="왜안보일까요?" style={{ width: "50%", height: "auto" }}/>
          <span className="DetAboutMean">
            V  oice <br/>
            O  ver <br/>
            D  iverse <br/>
            A  ssistance <br/></span>
        </div>
      </RelativeContainer>
    </StyledContainer>
    </>
)
}
export default AboutHover;
