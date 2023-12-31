import React, { useEffect, useRef } from 'react';
import './StreamComponent.css';
import * as faceapi from 'face-api.js';
import { useDispatch } from "react-redux";
import { updateExpressionData } from '../../store/expressionSlice';


export default function OvVideoComponent(props) {
  const videoRef = useRef(null);
  const expressionDataRef = useRef([]);
  const dispatch = useDispatch();

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

    faceMyDetect();
    console.log('load models');
  }

  const sendExpressionDataToStream = (expressionData) => {
    if (expressionData && props.handleExpressionData) {
      props.handleExpressionData(expressionData);
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (!videoRef.current) return;

      const FaceDetections = await faceapi.detectSingleFace(videoRef.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      expressionDataRef.current.push(FaceDetections?.expressions);
      expressionDataRef.current = expressionDataRef.current.slice(-20); // 최근 2초 (0.1초마다 갱신이므로 20개)

      // sendExpressionDataToStream(expressionDataRef.current);
      analyzeExpression(expressionDataRef.current);

      // console.log(expressionDataRef.current)
    }, 50); // 0.1초 대기
  };


  const analyzeExpression = (expressionData) => {
    /*if (expressionData && expressionData.length > 0) {
      let highestExpression = { expression: '', probability: 0 };
      expressionData.forEach((data) => {
        if (data) {     // data 일부 객체에 대해서 undefined 된 경우 무시,
          // console.log('가장 높게 검출된 표정 데이터:', data);
          for (const [expression, probability] of Object.entries(data)) {
            // console.log(expression, probability);
            // Object.entries 메서드로 순회하기 때문에 객체의 프로퍼티 중 하나라도 undefined이면 for 문에서 무시됩니다.
            if (probability > highestExpression.probability) {
              highestExpression = { expression, probability };
            }
          }
        }
      });
      
      dispatch(updateExpressionData({
        expression: highestExpression.expression,
        probability: highestExpression.probability,
      }))
    }*/
    /** 최대 빈도수로 표정 판별 */
    if (expressionData && expressionData.length > 0) {
      let expressionFrequency = {"angry": 0, "disgusted": 0, "fearful": 0, "happy": 0, "neutral": 0, "sad": 0, "surprised": 0}; // 각 표정의 빈도수를 저장할 객체

      expressionData.forEach((data) => {
          if (data) {
            let maxProbability = 0;
            let maxExpression = "neutral";
              for (const [expression, probability] of Object.entries(data)) {
                  if (probability && probability > 0 && probability > maxProbability) {
                      maxExpression = expression;
                      maxProbability = probability;
                  }
              }
            expressionFrequency[maxExpression]++;
          }
      });
      //console.log(expressionFrequency);
      let highestExpressionCount = 0;
      let mostFrequentExpression = '';
      
      // 가장 빈도수가 높은 표정 찾기
      for (const [expression, count] of Object.entries(expressionFrequency)) {
          if (count > highestExpressionCount) {
              highestExpressionCount = count;
              mostFrequentExpression = expression;
          }
      }
      
      dispatch(updateExpressionData({
          expression: mostFrequentExpression,
          probability: highestExpressionCount / expressionData.length
      }))
  }
  }

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
      </>
    );
  }
