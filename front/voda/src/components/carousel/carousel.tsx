import React, { useState, useEffect } from "react";
import "./carousel.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Img1 from "../../assets/images/slideImage1.png";
import Img2 from "../../assets/images/slideImage2.png";
import Img3 from "../../assets/images/slideImage3.png";

interface Slide {
  alt: string;
  caption?: any;
}

interface CarouselProps {
  slides: Slide[];
}

const images = [Img1, Img2, Img1, Img3];

const CarouselComponent: React.FC<CarouselProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTransition, setSlideTransition] = useState<"slide-left" | "slide-right" | "slide-center">("slide-center");

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setSlideTransition("slide-left");
    setTimeout(() => {
      setSlideTransition("slide-center");
    }, 500); // 0.5초 뒤에 중앙으로 복귀
  };
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setSlideTransition("slide-right");
    setTimeout(() => {
      setSlideTransition("slide-center");
    }, 500); // 0.5초 뒤에 중앙으로 복귀
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 3초마다 다음 슬라이드로 전환

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="prev-btn" onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <div className={`slide ${slideTransition}`}>
          <img
            src={images[activeIndex]}
            alt={slides[activeIndex].alt}
            style={{ objectFit: "cover" }}
          />
        </div>
        <button className="next-btn" onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
      {slides[activeIndex].caption && (
        <div className="caption">{slides[activeIndex].caption}</div>
      )}
    </div>
  );
};

export default CarouselComponent;
