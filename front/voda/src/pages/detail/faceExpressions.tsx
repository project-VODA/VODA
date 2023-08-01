import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

import styled from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';


const AppVideo = styled.div`
  align-items: center;
`;

const AppCanvas = styled.canvas`
  position: absolute;
  top: 100px;
`;

const MyApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

type CustomFaceExpressions = {
  [key: string]: number;
};


function FaceExpressionsComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [emotionsData, setEmotionsData] = useState<{ name: string; value: number }[]>([
    { name: 'neutral', value: 0 },
    { name: 'happy', value: 0 },
    { name: 'sad', value: 0 },
    { name: 'angry', value: 0 },
    { name: 'fearful', value: 0 },
    { name: 'disgusted', value: 0 },
    { name: 'surprised', value: 0 },
  ]);

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

            // Convert expressions to CustomFaceExpressions using unknown type
            const expressions = detections.expressions as unknown as CustomFaceExpressions;
            console.log(expressions); // face expressions 값

            // 감정 데이터 누적
            setEmotionsData((prevData) => {
              const newData = prevData.map((item) => ({
                ...item,
                value: item.value + (expressions[item.name] || 0),
              }));
              return newData;
            });

            // const landmarks = detections.landmarks;
            // console.log(landmarks); // face landmarks 값

          } else{
            console.log("감지된 얼굴이 없습니다.");
          }
        }
      }
    }, 100);
  };

  return (
    <MyApp>
      <h1>Face Detection</h1>
      <AppVideo>
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </AppVideo>
      <AppCanvas ref={canvasRef} width={940} height={650} />
      <div>
        <h2>Emotions Data:</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={emotionsData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {emotionsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${(Math.random() * 0xffffff).toString(16)}`} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </MyApp>
  );
}

export default FaceExpressionsComponent;