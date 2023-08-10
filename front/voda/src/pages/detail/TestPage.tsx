import React, { useRef, useEffect, useState } from "react";

import Title from '../../components/Title';

import { getHello, colorRecognition } from "../../apis/color";


const TestPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);//캡쳐된 이미지 확인용

  const returnHello = () => {
    getHello()
      .then((res) => { console.log(res)} )
      .catch((err)=>{ console.log(err)} )
  }

  const getColor = (formData:any) => {
    colorRecognition(formData)
      .then((res) => {
        console.log('검출된 색: ', res.color)}
      )
      .catch((err) => {
        console.log(err)}
      )
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startWebcam();
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('웹캠을 가져오는 데 실패했습니다:', error);
    }
  };


  // 화면 캡처
  function captureScreen() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const capturedImage = canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const formData = new FormData();
          formData.append('image', blob);
          setCapturedImage(URL.createObjectURL(blob));
          getColor(formData);
        }
      });
    }
  }

  return (
    <>
      <Title title="테스트 페이지" />
      <video ref={videoRef} autoPlay style={{ maxWidth: '50%', height: 'auto' }}></video>
      <button onClick={captureScreen}>화면 캡처</button>
      <button onClick={returnHello}>헬로우</button>
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

export default TestPage;