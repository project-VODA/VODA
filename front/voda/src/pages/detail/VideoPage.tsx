import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

import Title from '../../components/Title';

// import OpenVidu from "../../components/OpenVidu";
import VideoRoomComponent from '../../components/VideoRoomComponent';
import '../../styles/simple/video.css'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../hooks/reduxHook";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;


const SimpleVideo = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  // const location = useLocation();
  const [sessionToken, callNo] = useAppSelector((state) => {
    return [state.call.callInfo.sessionToken, state.call.callInfo.callNo];
  });

  useEffect(() => {
    let isMounted = true;

    navigator.mediaDevices.getUserMedia({video: {}})
      .then(stream => {
        if (isMounted) {
          setLocalStream(stream);
        }
      })
      .catch(err => {
        console.log(err);
      });
    
    return () => {
      isMounted = false; // 클린업(cleanup) 시 마운트 상태를 false로 설정하여 업데이트 방지
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    }
  }, []);

  return (
    <>
      {/* <StyledLink to='' aria-label="영상통화 페이지입니다.">
        <Title title="Video" />
      </StyledLink> */}
      <VideoRoomComponent token={sessionToken} callNo={callNo} />
    </>
  );
};

export default SimpleVideo;