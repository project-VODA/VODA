import { useRef, useState, useEffect } from "react";

// import VideoButton from './SettingButton';


interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
}

const RTCVideo = ({ mediaStream }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);

  useEffect(() => {
    if (!viewRef.current)
        return;
    viewRef.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);

  const toggleVideo = () => {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled((prev) => !prev);
    }
  }

  return(
    <>
      <video ref={viewRef} autoPlay controls muted={!videoEnabled}></video>
      <button onClick={toggleVideo}>
        {videoEnabled ? "Turn Off Video" : "Turn On Video"}
      </button>
    </>
  );
};

export default RTCVideo;
