// AboutHover.tsx
import React, { useState } from "react";
import "../styles/detail/DetailAbout.css";
import Smile from '../assets/images/Smile.jpg';

interface HoveringProps {
  className?: string;
  'aria-label'?: string;
}

const Hovering = ({ className, 'aria-label':ariaLabel }: HoveringProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
      <span className="hover-container">
        <div className="content-container">
          <div className="text-container">
            {isHovering ? (
              <>
                <h2>이제 잘 보이시죠?</h2>
                <p style={{ paddingTop: '15px'}}>잠시나마 공감하셨나요?</p>
              </>
            ) : (
              <>
                <h2>저시력자가 보는 모습입니다.</h2>
                <p style={{ paddingTop: '15px'}}>사진이 궁금하시다면 마우스를 올려보세요.</p>
              </>
            )}
          </div>
          <div className="image-container">
            <img
              src={Smile}
              alt="HoveringImage"
              className={isHovering ? "hovered-image" : "blurred-image"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </span>
  );
};

export default Hovering;
