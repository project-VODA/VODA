import React, { useEffect, useRef, useState } from 'react';
import './StreamComponent.css';
import * as faceapi from 'face-api.js';

export default function OvVideoComponent(props) {
  const videoRef = useRef(null);
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

  const loadModels = () => {
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ]).then(()=>{
      faceMyDetect();
      console.log('load models');
    })
  }

  const faceMyDetect = () => {
		setInterval(async() => {
      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(videoRef.current,
				new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      expressionDataRef.current.push(detections[0]?.expressions);
      expressionDataRef.current = expressionDataRef.current.slice(-20); // 최근 2초 (0.1초마다 갱신이므로 20개)

      console.log(expressionDataRef.current)
    }, 100); // 0.1초 대기
  };

	useEffect(() => {
		loadModels();
	}, [])


  return (
    <video
      autoPlay={true}
      id={'video-' + props.user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={props.mutedSound}
    />
  );
}
