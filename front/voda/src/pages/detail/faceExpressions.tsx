import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceExpressionsComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing the camera:', err);
        }
      }
    }

    async function detectFaceExpressions() {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/public/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/public/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/public/models');
      
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.play();
        
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        document.body.append(canvas);
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detectionsWithExpressions = await faceapi.detectSingleFace(videoRef.current, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          if (detectionsWithExpressions) {
            const expressions = detectionsWithExpressions.expressions;
            const landmarks = detectionsWithExpressions.landmarks;
            console.log(expressions); // face expressions 값
            console.log(landmarks); // face landmarks 값
          }
        }, 100); // 100ms 간격으로 얼굴 표정과 랜드마크를 감지합니다.
      }
    }

    startCamera();
    detectFaceExpressions();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} width="720" height="560" muted autoPlay />
    </div>
  );
};

export default FaceExpressionsComponent;