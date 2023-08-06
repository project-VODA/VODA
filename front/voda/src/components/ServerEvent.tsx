import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { API_URL } from '../constants/url';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { receiveCalling, rejectCalling } from '../apis/calling';

import { ReceiveResponseType, updateReceiveResponse } from '../store/callSlice';
import { Session } from 'openvidu-browser';

export default function SseComponent(){
    const [isCallModalOpen, setisCallModalOpen] = useState(false);
		const [data, setData] = useState({senderEmail: '', receiverEmail: '', sessioinId: '', token: '',  callNo: 0, content: ''});
    const [receiveToken , setReceiveToken] = useState('');
    const [callNo , setCallNo] = useState(0);

		const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userEmail, receiveResponse]:[string, ReceiveResponseType] = useSelector((state:RootState) => {
        return [state.user.userInfo.userEmail, state.call.receiveResponse];
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
						setData(JSON.parse(event.data)); //여기서 다 초기화 되어버림.,.. 뭔지 모르겠음 왜... 웨...
            const temp = JSON.parse(event.data);
            console.log(temp);
            setCallNo(temp.callNo);
            setReceiveToken(temp.token);
            dispatch(updateReceiveResponse({
              receiveToken : receiveToken,
              callNo : callNo,
            }));
            // console.log(receiveToken);
        });
        eventSource.addEventListener("reject", (event) => {
            setisCallModalOpen(true);
            setData(JSON.parse(event.data));
            // 통화 거절 추가 로직
        })
    }, [userEmail]);

		function redirectVideo(){
      console.log(receiveToken);
			navigate('/video');
		}

		function acceptCall(){
      receiveCalling(callNo)
      .then((res)=>{
        console.log(res);
        // dispatch(updateReceiveResponse({
        //   receiveToken : receiveToken,
        //   callNo : callNo,
        // }));
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
				<p>{data.senderEmail}이 전화를 걸었습니다.</p>
				{data.token}
				<button onClick={acceptCall}>통화 받기</button>
        <br />
        <button onClick={rejectCall}>통화 거절</button>
        
      </Modal>
    </>
		)
}