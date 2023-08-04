import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { API_URL } from '../constants/url';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { updateVideoToken } from '../store/userSlice';

export default function SseComponent(){
    const [isCallModalOpen, setisCallModalOpen] = useState(false);
		const [data, setData] = useState({senderEmail: '', token: ''});

		const navigate = useNavigate();
		const dispatch = useDispatch();

    const userEmail = useSelector((state:RootState) => {
        return state.user.userInfo.userEmail;
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
						setData(JSON.parse(event.data));
						dispatch(updateVideoToken({videoToken:data.token}))
        });
    }, [userEmail]);

		function redirectVideo(){
			navigate('/video');
		}

		function acceptCall(){
			redirectVideo();
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
      </Modal>
    </>
		)
}