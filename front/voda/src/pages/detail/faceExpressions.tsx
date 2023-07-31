import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

function FaceExpressionsComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startVideo();
    videoRef.current && loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          console.log('video on');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(() => {
      faceMyDetect();
      console.log('video detect');
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi.detectSingleFace(videoRef.current,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        if (canvasRef.current) {
          // Clear the canvas before drawing new detections
          const context = canvasRef.current.getContext('2d');
          if (context) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }

          if (detections) {
            faceapi.matchDimensions(canvasRef.current, {
              width: 940,
              height: 650
            });

            const resized = faceapi.resizeResults(detections, {
              width: 940,
              height: 650
            });

            faceapi.draw.drawDetections(canvasRef.current, resized);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
            
            const expressions = detections.expressions;
            const landmarks = detections.landmarks;
            console.log(expressions); // face expressions 값
            console.log(landmarks); // face landmarks 값
          } else{
            console.log("감지된 얼굴이 없습니다.");
          }
        }

      }
    }, 1000);
  };

  return (
    <div className="myapp">
      <h1>Face Detection</h1>
      <div className="appvide">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width={940} height={650} className="appcanvas" />
    </div>
  );
}

export default FaceExpressionsComponent;