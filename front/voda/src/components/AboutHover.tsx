// AboutHover.tsx
import React, { useState } from "react";
import "../styles/detail/AboutHover.css";
import Smile from '../assets/images/Smile.jpg';

const Hovering = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
      <div className="hover-container">
        <div className="content-container">
          <div className="text-container">
            {isHovering ? (
              <>
                <h2>이제 잘 보이시나요?</h2>
                <p>사진에 호버링한 상태입니다.</p>
              </>
            ) : (
              <>
                <h2>저시력자가 보는 모습입니다.</h2>
                <p>사진이 궁금하시다면 마우스를 올려보세요.</p>
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
      </div>
  );
};

export default Hovering;
