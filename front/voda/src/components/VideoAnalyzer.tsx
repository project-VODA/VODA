// videoAnalyzer.tsx

import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

function VideoAnalyzer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [emotionData, setEmotionData] = useState<any[]>([]);
  const [videoOn, setVideoOn] = useState<boolean>(true);
  const [showGraph, setShowGraph] = useState<boolean>(true);

  useEffect(() => {
    if (videoOn) {
      startVideo();
      videoRef.current && loadModels();
    }

    return () => {
      stopVideo();
    };
  }, [videoOn]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      })
      .catch((err) => console.error('Error accessing the camera:', err));
  };

  const stopVideo = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const toggleGraphVisibility = () => {
    setShowGraph((prevShowGraph) => !prevShowGraph);
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
            console.log(expressions);

            // Convert expressions to data format for the Recharts RadialBarChart
            const emotionChartData = Object.entries(expressions).map(([emotion, value]) => ({
              name: emotion,
              value: value * 100, // Convert probability to percentage
            }));

            setEmotionData(emotionChartData);
          } else {
            console.log("No detected face.");
          }
        }
      }
    }, 1000);
  };

  return (
    <div>
      <div>
        {videoOn ? (
          <button onClick={() => setVideoOn(false)}>Turn Video Off</button>
        ) : (
          <button onClick={() => setVideoOn(true)}>Turn Video On</button>
        )}

        {showGraph ? (
          <button onClick={toggleGraphVisibility}>Hide Graph</button>
        ) : (
          <button onClick={toggleGraphVisibility}>Show Graph</button>
        )}
      </div>
      {videoOn && (
        <>
          <video
            ref={videoRef}
            style={{ display: 'block', margin: 'auto' }}
            width="640"
            height="480"
            autoPlay
            muted
          />
          <canvas ref={canvasRef} width={940} height={650} style={{ display: 'none' }} />
        </>
      )}

      {showGraph && (
        <div style={{ width: '400px', margin: 'auto' }}>
          <RadialBarChart
            width={400}
            height={400}
            innerRadius="10%"
            outerRadius="80%"
            data={emotionData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              fill="#8884d8"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        </div>
      )}
    </div>
  );
};

export default VideoAnalyzer;
