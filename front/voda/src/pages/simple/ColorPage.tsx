import React, { useRef, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import SimpleTitle from '../../components/SimpleTitle';
import Button from '../../components/SettingButton'

import { colorRecognition } from "../../apis/color";
import { tts } from "../../apis/tts"
import * as faceapi from 'face-api.js';

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

  @media (max-width: 768px) {
    /* 모바일 화면 크기에서는 세로로 배치 */
    flex-direction: column;
  }
`;

const VideoContainer = styled.div`
  flex: 2;
  max-width: 50%;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 16px;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
  }
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const Title = styled.p`
  margin-top: 60px;
  text-align: center;
  font-size: 2em;
  font-weight: bold;

  @media (max-width: 768px) {
    /* 모바일 화면 크기에서 스타일 변경 */
    font-size: 1.5em;
    margin-top: 0px;
  }
`;

const ColorPage = () => {
  //CSS Style
  const videoStyle: React.CSSProperties = {
    transform: 'rotateY(180deg)',
    WebkitTransform: 'rotateY(180deg)',
    width: '100%',
    height: 'auto',
  };

  const textStyle: React.CSSProperties = {
    margin: '16px',
    textAlign: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
  };

  const [color, setColor] = useState(null);
  const typeNo = useSelector((state: RootState) => state.user.userSetting.usersettingTypeNo);
  const voiceName = typeNo === 0 || typeNo === 2 ? 'ko-KR-Neural2-C' : 'ko-KR-Neural2-A';
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioPlayer = new Audio();

  useEffect(() => {
    startWebcam();

    return () => {
      stopWebcam(); // 컴포넌트가 언마운트될 때 웹캠을 종료
    };
  }, []);

  const getColor = (formData: any) => {
    colorRecognition(formData)
      .then((res) => {
        setColor(res.color);
        colorTTS(res.color);
        console.log('인식된 색: ', res.color);
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )
  }

  const colorTTS = (color: string) => {
    let text = '';
    if(color === undefined){
      text = '색상을 인식하지 못했습니다.';
    } else{
      text = `인식된 색상은 ${color}입니다.`; // 음성으로 변환할 텍스트
    }

    const requestData = {
      input: {
        text: text,
      },
      voice: {
        languageCode: 'ko-KR', // 원하는 언어 코드
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3', // MP3 포맷으로 설정
      },
    };

    tts(requestData)
      .then((res) => {
        const audioData = res.audioContent;
        const audioArrayBuffer = Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer;
        const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        audioPlayer.src = audioUrl;
        audioPlayer.play();

      }
      )
      .catch(error => {
        console.error('TTS API 요청 중 오류:', error);
      });
  }

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


  //전체 캡쳐
  // function captureScreen() {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;

  //   if (video && canvas) {
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;

  //     const ctx = canvas.getContext('2d');
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     canvas.toBlob((blob: Blob | null) => {
  //       if (blob) {
  //         const formData = new FormData();
  //         formData.append('image', blob);
  //         getColor(formData);
  //       }
  //     });
  //   }
  // }

  const captureLeftEye = async () => {
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

        const startPoint1 = landmarks.positions[42];
        const startPoint2 = landmarks.positions[43];
        const endPoint1 = landmarks.positions[45];
        const endPoint2 = landmarks.positions[46];

        const startX = startPoint1.x;
        const startY = startPoint2.y;
        const width = endPoint1.x - startPoint1.x;
        const height = endPoint2.y - startPoint2.y;
        console.log('시작:', startX, startY);
        console.log('끝:', endPoint1.x, endPoint2.y);
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
              getColor(formData);
            }
          });
        }
      } else{
        console.log('얼굴이 인식되지 않았습니다.');
        setColor(null);
        const requestData = {
          input: {
            text: "얼굴이 인식되지 않았습니다.",
          },
          voice: {
            languageCode: 'ko-KR',
            name: voiceName,
          },
          audioConfig: {
            audioEncoding: 'MP3',
          },
        };

        tts(requestData)
          .then((res) => {
            const audioData = res.audioContent;
            const audioArrayBuffer = Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer;
            const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            audioPlayer.src = audioUrl;
            audioPlayer.play();

          }
          )
          .catch(error => {
            console.error('TTS API 요청 중 오류:', error);
          });
      }
    }
  }


  return (
    <>
      <StyledLink to='/home' aria-label='색상 인식 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요'>
        <SimpleTitle tabIndex={0} imgSrc='SimpleLogo' aria-live='assertive' aria-label='색상 인식 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요' />
      </StyledLink>

      <StyledContainer>
        <VideoContainer>
          <video tabIndex={1} style={videoStyle} ref={videoRef} autoPlay aria-label='웹캠 화면'></video>
        </VideoContainer>
        <div>
          <div>
            <Title tabIndex={2} aria-label='사용 안내'>How To Use</Title>
            <p tabIndex={3} style={textStyle} aria-label='1 얼굴이 인식될 수 있도록 얼굴을 정면으로 본 후 잠시 기다려 주세요.
            2 색상을 알고 싶은 물건을 왼쪽 눈에 대고 버튼을 눌러 주세요.
            3 인식된 색상이 음성으로 안내됩니다.'>
              1. 얼굴이 인식될 수 있도록 얼굴을 정면으로 본 후 잠시 기다려 주세요<br /><br />
              2. 색상을 알고 싶은 물건을 왼쪽 눈에 대고 버튼을 눌러 주세요.<br /><br />
              3. 인식된 색상이 음성으로 안내됩니다.<br /></p>
          </div>
          <SideContainer>
            <Button tabIndex={4} onClick={captureLeftEye} text="Start " aria-label="색상 인식 버튼" />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            {color && (
              <p style={textStyle}>인식된 색상: {color}</p>
            )}
          </SideContainer>
        </div>
      </StyledContainer>
    </>
  );
};

export default ColorPage;