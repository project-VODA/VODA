import React from "react";
import Hovering from "../../components/AboutHover";
import Title from "../../components/Title";
import logo_black from '../../assets/images/logo_black.png'

import "../../styles/detail/DetailAbout.css"
import "../../styles/detail/AboutHover.css"

const AboutHover = () => {
  return (
    <div>
      <Title className="DetAboutTitle" title='"표정"을 "소리"로 보다.'/>
      <Hovering className="AboutHovering"/> <br/>
      <img className="AboutLogo" src={logo_black} alt="왜안보일까요?" style={{ width: "300px", height: "auto" }}/>
      {/* <span className="DetSlogan">"표정"을 "소리"로 보다.</span> */}
      <span className="DetAboutMean">
      V  oice <br/>
      O  ver <br/>
      D  iverse <br/>
      A  ssistance <br/></span>
    </div>
  );
};

export default AboutHover;
