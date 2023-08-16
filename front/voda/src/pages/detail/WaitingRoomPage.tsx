import React, { useEffect, useState } from "react";

import Title from '../../components/Title';
import DivideContainer from '../../components/DivideHorizontalContainer'
import FriendList from "../../components/FriendList";
import RecentCalls from "../../components/RecentCall";
import VideoCall from "../../assets/images/VideoCall2.jpg"
import { Link } from "react-router-dom";
import styled from "styled-components";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const DetailRoom = () => {
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
      <StyledLink to='' aria-label="영상통화를 걸 친구를 찾는 페이지입니다.">
        <Title title="영상통화" />
      </StyledLink>
      <FriendList/>
      <RecentCalls/>
      </>
    )
  }
  return (
    <>
      <img src={VideoCall} alt="VideoCall" />
      <DivideContainer
        leftChild={<FriendList></FriendList>}
        rightChild={<RecentCalls></RecentCalls>}
      />
    </>
  );
};

export default DetailRoom;
