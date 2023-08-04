import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import Title from '../../components/Title';

// import OpenVidu from "../../components/OpenVidu";
import VideoRoomComponent from '../../components/VideoRoomComponent';
import '../../styles/simple/video.css'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;


const SimpleVideo = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  const location = useLocation();
  const sessionToken = useSelector((state: RootState) => {
    return state.user.call.token;
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
      setLocalStream(stream);
    })
  }, []);

  return (
    <>
    <StyledLink to='' aria-label="영상통화 페이지입니다.">
      <Title title="Video" />
    </StyledLink>
      <VideoRoomComponent token={sessionToken} callNo={1} />
    </>
  );
};

export default SimpleVideo;