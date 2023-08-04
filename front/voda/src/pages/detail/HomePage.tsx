import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/SettingButton"
import Carousel from "../../components/carousel/carousel";

const DetailPage = () => {
  
  const navigate = useNavigate();

  const redirectAbout = () => {
    navigate('/about')
  };

  const redirectVideo = () => {
    navigate('/waiting')
  };

  const redirectFeedback = () => {
    navigate('/feedback')
  };

  const slides = [
    {
      src: "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
      alt: "Image 1",
      caption: <Button 
                text="바로가기"
                onClick={redirectAbout}
                />,
    },
    {
      src: "https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg",
      alt: "Image 2",
      caption: <Button 
                text="바로가기"
                onClick={redirectVideo}
                />,
    },
    {
      src: "https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg",
      alt: "Image 2",
      caption: <Button 
                text="바로가기"
                onClick={redirectFeedback}
                />,
    },
  ];
  return (
    <>
      <Carousel slides={slides} />
    </>
  );
};

export default DetailPage;
