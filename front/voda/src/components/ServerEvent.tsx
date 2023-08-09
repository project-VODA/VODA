import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { API_URL } from '../constants/url';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import HandleButton from './HandleBtn';

import { receiveCalling, rejectCalling } from '../apis/calling';

import { Session } from 'openvidu-browser';
import { callInfoType, updateCall } from '../store/callSlice';
import { styled } from 'styled-components';
import AlarmAudio from './AlarmAudio';
import { userSliceLogout } from '../store/userSlice';

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 15%;
  margin-left: 15%;
  align-items: center;
  text-align: center;
`;

const modalColor = {
  content: {
    backgroundColor: '#001d3d',
  },
}

export default function SseComponent(){
	const navigate = useNavigate();
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [callNo, setCallNo] = useState(0);
  const [isCallModalOpen, setisCallModalOpen] = useState(false);
  const [userEmail, callInfo]:[string, callInfoType] = useSelector((state:RootState) => {
    return [state.user.userInfo.userEmail, state.call.callInfo];
  });
  const [alarm, setAlarm] = useState(getNotificaationPermission());

  useEffect(() => {
    if(userEmail == null || userEmail == ''){
      return;
    }
    const eventSource = new EventSource(`${API_URL}/subscribe/${userEmail}`);
    eventSource.addEventListener("connection", (event) => {
      console.log("SSE 연결 완료");
    });
    eventSource.addEventListener("call", (event) => {
      //카메라가 로드되는 것을 고려해서 4초 지연 후 알림
      setTimeout(() => {
        setisCallModalOpen(true);
        const response = JSON.parse(event.data);
        dispatch(updateCall({
          sessionToken : response.token,
          sessionId : response.sessionId,
          callNo : response.callNo,
        }));
        setContent(response.content);
        setCallNo(response.callNo);
        if(alarm){
          new Notification("VODA", {body: `${response.content}`});
        }
      }, 4000); 
    });
    eventSource.addEventListener("reject", (event) => {
      setisCallModalOpen(true);
      // 통화 거절 추가 로직
      const response = JSON.parse(event.data);
      setContent(response.content);
      setCallNo(response.callNo);
    });
    eventSource.addEventListener("logout", (event) => {
      dispatch(userSliceLogout());
      navigate('/');
    });

    return () => {
      if(userEmail == null || userEmail == ''){
        eventSource.close();
      }
    }
  }, [userEmail]);

	function redirectVideo(){
		navigate('/video');
	}

	function acceptCall(){
    receiveCalling(callNo)
    .then((res)=>{
      setisCallModalOpen(false);
      redirectVideo();
    })
    .catch((err)=> {
      console.log(err);        
    });
	}

  function rejectCall() {
    rejectCalling(callNo)
    .then((res) => {
      setisCallModalOpen(false);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function getNotificaationPermission() {
    if("Notification" in window){
      Notification.requestPermission();
      if(Notification.permission === "granted") return true;
      else return false;
    }else{
      console.log("알림을 지원하지 않는 브라우저입니다.");
      return false;
    }
  }

  return (
  <>
    <AlarmAudio playing={isCallModalOpen}/>
    <Modal id="callModal"
      isOpen={isCallModalOpen} 
      onRequestClose={(e) => setisCallModalOpen(false)}
      ariaHideApp={false}
      style={modalColor}
      shouldCloseOnOverlayClick={false}
    >
      <p style={{textAlign: 'center', fontSize: 'xx-large', margin: '5%'}}>{content}</p>
      <ButtonContainer>
        <HandleButton text='통화 받기' onClick={acceptCall} />
        <HandleButton text='통화 거절' onClick={rejectCall} />
      </ButtonContainer>
    </Modal>
  </>
  )
}