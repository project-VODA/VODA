import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";
import { getRecentCallList, sendCalling } from '../apis/calling';
import { userInfo } from 'os';
import { UserInfoType } from '../store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

// react-icons
import { FiPhoneCall } from "react-icons/fi"
import '../styles/detail/DetailWaitingPage.css'


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
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })
  const [callHistoryList, setCallHistoryList] = useState<CallHistoryList>([]);

  useEffect(() => {
    getRecentCallList()
      .then((res: CallHistoryList) => {
        setCallHistoryList(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  const navigate = useNavigate();

  const handleCalling = (email: string) => {
    const callSendRequest = {
      senderEmail : userInfo.userEmail,
      receiverEmail : email
    }

    sendCalling(callSendRequest)
      .then((res) => {
        console.log(res.data.sessionToken);
        navigate('/video',{
          state: {
            sessionToken : `${res.data.sessionToken}`,
            callNo : `${res.data.callNo}`
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
    <span> {localStorage.getItem('theme') === 'simple' ? (<div style={{ display: 'flex', justifyContent: 'center', margin: '6% 55px 2%' }}><span style={{ fontSize:'28px', fontWeight:'bolder' }}>최근 통화 목록</span></div>)
    :(<div style={{  display: 'flex', justifyContent: 'center', margin: '6% 55px 2%'}}>
        <span style={{ fontSize:'28px', fontWeight:'bolder' }}>최근 통화 목록</span>
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
          <th>대상</th>
          <th>통화시간</th>
          <th id='DetailCallContainer'></th>
        </tr>
      </thead>
      <tbody>
        {callHistoryList.length === 0 ? <tr><td colSpan={3}>통화 기록이 존재하지 않습니다.</td></tr> :
          callHistoryList.map((callHistory: CallHistory) => (
            <tr key={callHistory.startTime}  style={{ textAlign: 'center' }}>
              <td text-align='center'>{callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName}</td>
              <td text-align='center'>{callHistory.startTime}</td>
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
        <tr style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
          <th>대상</th>
          <th>통화시간</th>
          <th id='DetailCallContainer'></th>
        </tr>
      </thead>
      <tbody>
        {callHistoryList.length === 0 ? <tr><td colSpan={3} style={{ textAlign: 'center' }}>통화 기록이 존재하지 않습니다.</td></tr> :
          callHistoryList.map((callHistory: CallHistory) => (
            <tr key={callHistory.startTime}  style={{ textAlign: 'center' }}>
              <td text-align='center'>{callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName}</td>
              <td text-align='center'>{callHistory.startTime}</td>
              <div id='DetailCallContainer'>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '28px', fontSize:'25px'}}>
              <span>
                {localStorage.getItem('theme') === 'simple' ?
              (<td text-align='center'><Button text="통화" onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} aria-label={`${callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName} 님에게 전화를 하려면 버튼을 누르세요`}/></td>
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