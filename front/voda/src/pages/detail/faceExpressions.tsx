import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FaceExpressionsComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false)
  const [captureVideo, setCaptureVideo] = useState<boolean>(false)

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        // faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(() => {
        setModelsLoaded(true);
        console.log('model loaded');
      });
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVideoOnPlay = () => {
    const canvas = canvasRef.current;
    const displaySize = { width: 640, height: 480 };

    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);

    return () => {
      clearInterval(intervalId); // 인터벌 정리
    };
  };

  const closeWebcam = () => {
    videoRef?.current?.pause();
    videoRef.current.srcObject = null;
    setCaptureVideo(false);
  }

  return (
    <VideoContainer>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'tomato', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Close Webcam
            </button>
            :
            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'blue', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Open Webcam
            </button>
        }
      </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} width={640} height={480} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} muted={!captureVideo}/>
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </VideoContainer>
  );
}

export default FaceExpressionsComponent;