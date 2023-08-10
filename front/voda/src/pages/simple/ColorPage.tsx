import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import SimpleTitle from '../../components/SimpleTitle';
import Button from '../../components/board/WriteButton';

import { colorRecognition } from "../../apis/color";

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

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
          getColor(formData);
        }
      });
    }
  }

  return (
    <>
      <StyledLink to='/home' aria-label='색상 인식 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요'>
        <SimpleTitle imgSrc='SimpleLogo' aria-live='assertive' aria-label='색상 인식 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요'/>
      </StyledLink>
      <StyledContainer>
        <VideoContainer>
          <video style={videoStyle} ref={videoRef} autoPlay></video>
        </VideoContainer>
        <div>
          <Button onClick={captureScreen} text="Start" aria-label="색상 인식 버튼"/>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          {color && (
            <p style={colorStyle}>검출된 색상: {color}</p>
          )}
        </div>
      </StyledContainer>
    </>
  );
};

export default ColorPage;