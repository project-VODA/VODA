import React, { useRef, useEffect, useState } from "react";

import Title from '../../components/Title';

import { getHello, colorRecognition } from "../../apis/color";
import Button from '../../components/board/WriteButton';
import { CgColorPicker } from "react-icons/cg";

const TestPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);//캡쳐된 이미지 확인용
  const [color, setColor] = useState(null);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row', // 가로로 정렬
    // alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'center',
    minHeight: '100vh',
    marginTop: '5%',
  };

  const videoContainerStyle: React.CSSProperties = {
    flex: 2, // 화면을 반으로 나누기 위해 추가
    maxWidth: '50%',
    borderRadius: '10px',
    overflow: 'hidden',
    marginRight: '16px', // 비디오 컨테이너와 버튼 사이의 간격
    marginTop: '16px', // 위쪽 여백
  };

  const style: React.CSSProperties = {
    transform: 'rotateY(180deg)',
    WebkitTransform: 'rotateY(180deg)',
    width: '100%', 
    height: 'auto',
  };

  const capturedImageStyle: React.CSSProperties = {
    transform: 'rotateY(180deg)',
    WebkitTransform: 'rotateY(180deg)',
    width: '50%', 
    height: 'auto',
  };

  const colorStyle: React.CSSProperties = {
    margin: '16px',
    fontSize: '18px', // 폰트 크기 설정
    fontWeight: 'bold', // 굵은 글씨 설정
  };

  const buttonStyle: React.CSSProperties = {
    alignSelf: 'flex-start',
    // marginBottom: '16px',
    // margin: '10px',
    padding: '20px',
    textAlign: 'center',
    fontSize: '20px',
    backgroundSize: '200% auto',
    color: 'white',
    border: 'none', // 검정 테두리 없애기
    boxShadow: '0 0 20px #eee',
    borderRadius: '40px',
    backgroundImage: 'linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)',
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


  // 화면 캡처
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
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          <video style={style} ref={videoRef} autoPlay></video>
        </div>
        <div>
          {/* <Button onClick={captureScreen} text={'색상 인식'} aria-label={'색상 인식 버튼'}/> */}
          <button onClick={captureScreen} style={buttonStyle}>Start <CgColorPicker size={20} /></button>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          {/* {capturedImage && (
            <div>
              <h2>캡처된 이미지</h2>
              <img style={capturedImageStyle} src={capturedImage} alt="Captured"/>
            </div>
          )} */}
          {color && (
          <p style={colorStyle}>검출된 색상: {color}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TestPage;