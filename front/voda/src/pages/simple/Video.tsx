import React, { useState, useEffect } from "react";

import Title from '../../components/Title';

import RTCVideo from '../../components/RTCVideo'


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
      
      <RTCVideo mediaStream={localStream} />

      {/* <button onClick={startVideo}>start</button> */}
    </>
  );
};

export default SimpleVideo;
