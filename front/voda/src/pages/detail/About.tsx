import React from "react";
import Hovering from "../../components/AboutHover";
import "../../styles/detail/AboutHover.css"
import Title from "../../components/Title";

const AboutHover = () => {
  return (
    <div>
      <Title className="DetAboutTitle" title="Transforming Visions into Sound"/>
      <Hovering />
    </div>
  );
};

export default AboutHover;
