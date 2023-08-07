import React, { useEffect, useRef } from 'react';
import './StreamComponent.css';
import * as faceapi from 'face-api.js';
// import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
// import * as mpHands from '@mediapipe/hands';

export default function OvVideoComponent(props) {
  const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  const expressionDataRef = useRef([]);

  useEffect(() => {
    if (props.user.streamManager && videoRef.current) {
      console.log('PROPS: ', props);
      props.user.getStreamManager().addVideoElement(videoRef.current);
    }

    if (props.user.streamManager.session && props.user && videoRef.current) {
      props.user.streamManager.session.on('signal:userChanged', (event) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          props.user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }
  }, []);

  const loadModels = async () => {
    await Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ])
    
    // Load hand-pose-detection model
    // const model = handPoseDetection.SupportedModels.MediaPipeHands;
    // const detectorConfig = {
    //   runtime: 'mediapipe', // or 'tfjs'
    //   modelType: 'full',
    //   solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`
    // };
    // const detector = await handPoseDetection.createDetector(model, detectorConfig);

    faceMyDetect();
    console.log('load models');
  }

  const sendExpressionDataToStream = (expressionData) => {
    if (expressionData && props.handleExpressionData) {
      props.handleExpressionData(expressionData);
    }
  };

  const faceMyDetect = () => {
		setInterval(async() => {
      if (!videoRef.current) return;

      const FaceDetections = await faceapi.detectAllFaces(videoRef.current,
				new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      // const HandPoseDetections = await detector.estimateHands(videoRef.current);

      expressionDataRef.current.push(FaceDetections[0]?.expressions);
      expressionDataRef.current = expressionDataRef.current.slice(-20); // 최근 2초 (0.1초마다 갱신이므로 20개)

      // 상위 컴포넌트로 데이터 전달, 정확히는 데이터 갱신 - useState
      // props.setExpressionDataRef(prevData => [...prevData, detections[0]?.expressions].slice(-20));

      sendExpressionDataToStream(expressionDataRef.current);

      // console.log(expressionDataRef.current)
      // if (HandPoseDetections) {
      //   console.log(HandPoseDetections);
      // }

      // const canvas = canvasRef.current;
      // const context = canvas.getContext('2d');
      // context.clearRect(0, 0, canvas.width, canvas.height);

      // faceapi.draw.drawDetections(canvas, FaceDetections);
      // faceapi.draw.drawFaceLandmarks(canvas, FaceDetections);

      // HandPoseDetections.forEach((hand) => {
      //   mpHands.draw.drawHand(canvas, hand);
      // })

    }, 100); // 0.1초 대기
  };

	useEffect(() => {
		loadModels();
	}, [])


  return (
    <>
      <video
      autoPlay={true}
      id={'video-' + props.user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={props.mutedSound}
      />
      {/* <canvas
        id="canvas"
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      /> */}
    </>
  );
}
