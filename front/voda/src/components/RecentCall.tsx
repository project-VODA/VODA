import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";
import { getRecentCallList, sendCalling } from '../apis/calling';
import { userInfo } from 'os';
import { UserInfoType } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

import { updateCall } from "../store/callSlice";

// react-icons
import { FiPhoneCall } from "react-icons/fi"
import '../styles/detail/DetailWaitingPage.css'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import useErrorHandlers from '../hooks/useError';


type CallHistory = {
  senderName: string;
  senderEmail: string;
  receiverName: string;
  receiverEmail: string;
  startTime: string;
  endTime: string;
};

type CallHistoryList = CallHistory[];


const RecentCalls = () => {
  // redux에서 저장된 정보 가져오기
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [callHistoryList, setCallHistoryList] = useState<CallHistoryList>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorHandlers = useErrorHandlers();

  useEffect(handleRecentCall, []);

  function handleRecentCall() {
    getRecentCallList()
      .then((res: CallHistoryList) => {
        setCallHistoryList(res);
      })
      .catch((err) => {
        errorHandlers(err.response, handleRecentCall);
      })
  }

  const handleCalling = (email: string) => {
    const callSendRequest = {
      senderEmail : userInfo.userEmail,
      receiverEmail : email
    }

    sendCalling(callSendRequest)
      .then((res) => {
        console.log(res);
        dispatch(updateCall({
          sessionToken: res.data.sessionToken,
          sessionId: res.data.sessiondId,
          callNo: res.data.callNo
        }));
        if(res.data === "oncalling"){
          navigate('/waiting')
        }else{
          navigate('/video');
        }
      })
      .catch((err) => {
        errorHandlers(err.response, handleCalling, email);
      });
  };

  return (
    <>
    <span> {localStorage.getItem('theme') === 'simple' ? (<div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px' }}>
      <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize:'1.9vw', fontWeight: 'bolder' }}>최근 통화 목록</span></div>)
    :(<div style={{ marginTop:'5.6vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px' }}>
        <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize:'1.9vw', fontWeight: 'bolder' }}>최근 통화 목록</span>
      </div>)} </span>
      <span> {localStorage.getItem('theme') === 'simple' ? 
      ( <table className = 'recentCallTable' style={{ margin: '10px auto', justifyContent: 'center', borderCollapse: 'separate', borderSpacing: '0px, 20px', maxWidth: '950px' }}>
      <colgroup>
        <col width = "45%" />
        <col width = "45%" />
        <col width = "10%" />
      </colgroup>
      <thead>
        <tr style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
          <th>이름</th>
          <th>통화시간</th>
          <th id='DetailCallContainer'></th>
        </tr>
      </thead>
      <tbody>
        {callHistoryList.length === 0 ? <tr><td colSpan={3}>통화 기록이 존재하지 않습니다.</td></tr> :
          callHistoryList.map((callHistory: CallHistory) => (
            <tr key={callHistory.startTime}  style={{ paddingLeft: '5vw' }}>
              <td>{callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName}</td>
              {/* <td text-align='center'>{callHistory.startTime}</td> */}
              <td>
                {callHistory.startTime !== null ? callHistory.startTime : '시작 시간 없음'}
              </td>
              <div id='DetailCallContainer'>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '40%', fontSize:'25px', margin: '7% 55px 2%'}}>
              <span>
                {localStorage.getItem('theme') === 'simple' ?
              (<td text-align='center'><Button text="통화" onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} aria-label={`${callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName} 님에게 전화를 하려면 버튼을 누르세요`}/></td>
              ) : (<FiPhoneCall onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} />)}
              </span></div></div>
            </tr>
        ))}
      </tbody>
    </table> ) : (
      <table className = 'recentCallTable'  style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
      <colgroup>
        <col width = "45%" />
        <col width = "45%" />
        <col width = "10%" />
      </colgroup>
      <thead>
        <tr style={{ borderCollapse: 'separate', borderSpacing: '0px 20px', fontWeight: 'bold' }}>
          <th>이름</th>
          <th>통화시간</th>
          {localStorage.getItem('theme') === "simple" ? (          
          <th> </th>) : ( <th id='DetailCallContainer'></th> )}
        </tr>
      </thead>
      <tbody>
        {callHistoryList.length === 0 ? <tr><td colSpan={3} style={{ textAlign: 'center' }}>통화 기록이 존재하지 않습니다.</td></tr> :
          callHistoryList.map((callHistory: CallHistory) => (
            <tr key={callHistory.startTime}  >
              <td style={{ paddingLeft: '7vw' }}>{callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName}</td>
              <td style={{textAlign: 'center'}}>
                {callHistory.startTime !== null ? callHistory.startTime : '시작 시간 없음'}
              </td>
              <div id='DetailCallContainer'>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '28px', fontSize:'25px'}}>
              <span>
                {localStorage.getItem('theme') === 'simple' ?
              (<td><Button text="통화" onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} aria-label={`${callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName} 님에게 전화를 하려면 버튼을 누르세요`}/></td>
              ) : (<FiPhoneCall style={{ cursor: 'pointer' }} onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} />)}
              </span></div></div>
            </tr>
        ))}
      </tbody>
    </table>)}</span>
    </>
  );
};

export default RecentCalls;