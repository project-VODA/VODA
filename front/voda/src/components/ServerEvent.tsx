import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { API_URL } from '../constants/url';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { receiveCalling, rejectCalling } from '../apis/calling';

import { Session } from 'openvidu-browser';
import { callInfoType, updateCall } from '../store/callSlice';

export default function SseComponent(){
		const navigate = useNavigate();
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [callNo, setCallNo] = useState(0);
    const [isCallModalOpen, setisCallModalOpen] = useState(false);
    const [userEmail, callInfo]:[string, callInfoType] = useSelector((state:RootState) => {
        return [state.user.userInfo.userEmail, state.call.callInfo];
    })

    useEffect(() => {
        if(userEmail == null || userEmail == ''){
            return;
        }
        const eventSource = new EventSource(`${API_URL}/subscribe/${userEmail}`);
        eventSource.addEventListener("connection", (event) => {
            console.log("SSE 연결 완료", event);
        });
        eventSource.addEventListener("call", (event) => {
            setisCallModalOpen(true);
            const response = JSON.parse(event.data);
            dispatch(updateCall({
              sessionToken : response.token,
              sessionId : response.sessionId,
              callNo : response.callNo,
            }));
            setContent(response.content);
            setCallNo(response.callNo);
        });
        eventSource.addEventListener("reject", (event) => {
            setisCallModalOpen(true);
            // 통화 거절 추가 로직
        })
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    return (
    <>
			<Modal id="callModal"
          isOpen={isCallModalOpen} 
          onRequestClose={(e) => setisCallModalOpen(false)}
          ariaHideApp={false}
        >
				<p>{content}</p>
        <br/>
				<button onClick={acceptCall}>통화 받기</button>
        <br />
        <button onClick={rejectCall}>통화 거절</button>
        
      </Modal>
    </>
		)
}