import React, { useState, useEffect } from "react";

import VideoRoomComponent from '../../components/VideoRoomComponent';
import '../../styles/simple/video.css'
import { useAppSelector } from "../../hooks/reduxHook";

const DetailVideo = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  const {sessionToken, callNo} = useAppSelector((state) => state.call.callInfo);

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
      <VideoRoomComponent token={sessionToken} callNo={callNo} />
    </>
  );
};

export default DetailVideo;