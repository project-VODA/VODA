import React, { useRef, useEffect } from "react";
import Title from '../components/Title';
import * as faceapi from 'face-api.js';
import "./video.css";
// import * as model from '../../../public/models'

const DetailVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);


  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
        console.log('video on')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      faceMyDetect();
      console.log('face detect')
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(videoRef.current,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        if (canvas) {
          canvasRef.current.innerHTML = '';
          canvasRef.current.appendChild(canvas);
          faceapi.matchDimensions(canvas, {
            width: 940,
            height: 650
          });

          const resized = faceapi.resizeResults(detections, {
            width: 940,
            height: 650
          });

          faceapi.draw.drawDetections(canvas, resized);
          faceapi.draw.drawFaceLandmarks(canvas, resized);
          faceapi.draw.drawFaceExpressions(canvas, resized);
        }
      }
    }, 1000);
  };

  return (
    <div className="myapp">
      <Title title="Face-video" />
      <div className="appvide">
        <video className="appvideo" crossOrigin="anonymous" ref={videoRef} autoPlay></video>
        <canvas className="appcanvas" ref={canvasRef} width={940} height={650} />
      </div>
    </div>
  );
};

export default DetailVideo;