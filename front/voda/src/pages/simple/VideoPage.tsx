import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import Title from '../../components/Title';

// import OpenVidu from "../../components/OpenVidu";
import VideoRoomComponent from '../../components/VideoRoomComponent';
import '../../styles/simple/video.css'


const SimpleVideo = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  const location = useLocation();
  const sessionToken = location.state.sessionToken;
  const callNo = location.state.callNo;
  console.log(sessionToken);
  console.log(callNo);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
      setLocalStream(stream);
    })
  }, []);

  return (
    <>
      <Title title="Video" />
      <VideoRoomComponent token={sessionToken} callNo={callNo} />
    </>
  );
};

export default SimpleVideo;