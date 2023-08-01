import React, { useState, useEffect } from "react";

import Title from '../../components/Title';

// import OpenVidu from "../../components/OpenVidu";
import VideoRoomComponent from '../../components/VideoRoomComponent';
import '../../styles/simple/video.css'


const SimpleVideo = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
      setLocalStream(stream);
    })
  }, []);

  return (
    <>
      <Title title="Video" />
      <VideoRoomComponent />

      {/* <button onClick={startVideo}>start</button> */}
    </>
  );
};

export default SimpleVideo;