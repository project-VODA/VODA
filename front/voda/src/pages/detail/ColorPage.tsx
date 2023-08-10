import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components';

import { colorRecognition } from "../../apis/color";
import { CgColorPicker } from "react-icons/cg";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: calc(100vh - 100px);
`;

const VideoContainer = styled.div`
  flex: 2;
  max-width: 50%;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 16px;
  margin-top: 60px;
`;

const ColorPage = () => {
  //CSS Style 적용

  const videoStyle: React.CSSProperties = {
    transform: 'rotateY(180deg)',
    WebkitTransform: 'rotateY(180deg)',
    width: '100%', 
    height: 'auto',
  };

  const colorStyle: React.CSSProperties = {
    margin: '16px',
    fontSize: '25px',
    fontWeight: 'bold',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '16px',
    marginTop: '60px',
    borderRadius: '500px',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px 30px',
  };

  // const capturedImageStyle: React.CSSProperties = {
  //   transform: 'rotateY(180deg)',
  //   WebkitTransform: 'rotateY(180deg)',
  //   width: '300px',
  // };


  const getColor = (formData:any) => {
    colorRecognition(formData)
      .then((res) => {
        setColor(res.color)
        console.log('검출된 색: ', res.color)}
      )
      .catch((err) => {
        console.log(err)}
      )
  }

  const [capturedImage, setCapturedImage] = useState(null);
  const [color, setColor] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startWebcam();

    return () => {
      stopWebcam(); // 컴포넌트가 언마운트될 때 웹캠을 종료
    };
  }, []);

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('웹캠을 가져오는 데 실패했습니다:', error);
    }
  };


  function captureScreen() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

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

  return (
    <>
      <StyledContainer>
        <VideoContainer>
          <video style={videoStyle} ref={videoRef} autoPlay></video>
        </VideoContainer>
        <div>
          <button onClick={captureScreen} style={buttonStyle}>Start <CgColorPicker size={20} /></button>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          {color && (
            <p style={colorStyle}>검출된 색상: {color}</p>
          )}
          {/* {capturedImage && (
            <div>
              <img style={capturedImageStyle} src={capturedImage} alt="Captured"/>
            </div>
          )} */}
        </div>
    </StyledContainer>
    </>
  );
};

export default ColorPage;