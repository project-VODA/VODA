import React, { useRef, useState, useEffect } from 'react';

import Title from '../../components/Title';

import * as faceapi from 'face-api.js';

import { colorRecognition } from "../../apis/color";


const FaceTest = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isWebcamOn, setIsWebcamOn] = useState<boolean>(false); // 초기값을 false로 설정

  const getColor = (formData: FormData) => {
    colorRecognition(formData)
      .then((res) => {
        console.log('검출된 색: ', res.color)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isWebcamOn) {
      startWebcam();
    } else {
      stopWebcam();
    };
  }, [isWebcamOn]); // 웹캠 상태 변화 시에만 호출 - isWebcamOn

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('웹캠을 가져오는 데 실패했습니다:', error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  // 전체 화면 캡쳐
  const captureScreen = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const formData = new FormData();
          formData.append('image', blob);
          setCapturedImage(URL.createObjectURL(blob));
          getColor(formData);
        }
      });
    }
  }


  const captureFaceCheek = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'), // 모델 로드
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'), // 모델 로드
      ]);

      const detections = await faceapi.detectSingleFace(video, 
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

      if (detections) {
        console.log(detections)
        const faceBox = detections.detection.box;
        const landmarks = detections.landmarks;

        const startPoint = landmarks.positions[35];
        const endPoint = landmarks.positions[5];

        const startX = startPoint.x;
        const startY = startPoint.y;
        const width = startPoint.x - endPoint.x;
        const height = endPoint.y - startPoint.y;
        console.log('시작:', startX, startY);
        console.log('끝:', endPoint.x, endPoint.y);
        console.log('너비:', width);
        console.log('높이:', height);

        const faceCanvas = document.createElement('canvas');
        const faceCtx = faceCanvas.getContext('2d');

        if (faceBox) {
          faceCanvas.width = width;
          faceCanvas.height = height;

          // faceCtx?.drawImage(canvas, faceBox.x, faceBox.y, faceBox.width, faceBox.height, 0, 0, faceBox.width, faceBox.height);
          faceCtx?.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);

          faceCanvas.toBlob((blob: Blob | null) => {
            if (blob) {
              const formData = new FormData();
              formData.append('image', blob);
              setCapturedImage(URL.createObjectURL(blob));
              getColor(formData);
            }
          });
        }
      }
    }
  }

  return (
    <>
      <Title title="비디오 페이지" />
      <video ref={videoRef} autoPlay style={{ maxWidth: '50%', height: 'auto', display: isWebcamOn ? "block" : "none" }}></video>
      <button onClick={captureScreen}>전체 화면 캡쳐</button>
      <button onClick={captureFaceCheek}>오른쪽 볼 캡처</button>
      <button onClick={() => setIsWebcamOn(prevState => !prevState)}>
        {isWebcamOn ? "웹캠 끄기" : "웹캠 켜기"}
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {capturedImage && (
        <div>
          <h2>캡처된 이미지</h2>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
      )}
    </>
  );
};

export default FaceTest;
