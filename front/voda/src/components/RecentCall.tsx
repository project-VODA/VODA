import React, { useEffect, useState } from 'react';

import Button from "./SettingButton";
import Modal from 'react-modal';
import SmallRedButton from '../components/SmallRedBtn'
import { getRecentCallList, sendCalling } from '../apis/calling';
import { useNavigate } from 'react-router-dom';

import { updateCall } from "../store/callSlice";
import '../styles/detail/DetailWaitingPage.css'
import { styled } from 'styled-components';

// react-icons
import { FiPhoneCall } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import useErrorHandlers from '../hooks/useError';

const ScrollBox = styled.div`
  overflow: scroll;
  height: 70vh;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;  
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 29, 61, .8);
    border-radius: 10px;  
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 53, 102, .1);
    border-radius: 10px;  
  }
`

const ContextBox = styled.div`
  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0.7em;
    margin-top: 0.7em;
    font-weight: bolder;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul, ol {
    margin-left: 1.5em; 
  }

  li {
    margin-bottom: 0.5em;
  }

`


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
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');

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
        const msg = res.data;

        if(msg === "senderOn"){
          setMsg("자신에게 걸려온 통화가 있는지 확인하세요");
          setIsMsgOpen(true);
        } else if( msg === "receiverOn"){
          setMsg("상대방이 통화중입니다.");
          setIsMsgOpen(true);
        }else {
          dispatch(updateCall({
            sessionToken: res.data.sessionToken,
            sessionId: res.data.sessiondId,
            callNo: res.data.callNo
          }));
          navigate('/video');
        }
      })
      .catch((err) => {
        errorHandlers(err.response, handleCalling, email);
      });
  };

  return (
    <div style={{ marginTop: '7px'}}>
      <ContextBox>
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
        <tr style={{ borderCollapse: 'separate', borderSpacing: '0px 20px', fontSize: '1.6vw' }}>
          <th>이름</th>
          <th>통화시간</th>
          <th id='DetailCallContainer'></th>
        </tr>
      </thead>
      <tbody>
        {callHistoryList.length === 0 ? <tr><td colSpan={3}>통화 기록이 존재하지 않습니다.</td></tr> :
          callHistoryList.map((callHistory: CallHistory) => (
            <tr key={callHistory.startTime}  style={{ paddingLeft: '5vw', fontSize: '1.4vw' }}>
              <td>{callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName}</td>
              <td>
                {callHistory.startTime !== null ? callHistory.startTime : '시작 시간 없음'}
              </td>
              <div id='DetailCallContainer'>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '40%', fontSize:'25px', padding: '6vh 0px 0px'}}>
              <span>
                {localStorage.getItem('theme') === 'simple' ?
              (<td text-align='center'><Button className="RecentCallBtn" text="통화" onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} aria-label={`${callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName} 님에게 전화를 하려면 버튼을 누르세요`}/></td>
              ) : (<FiPhoneCall onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)} />)}
              </span></div></div>
            </tr>
        ))}
      </tbody>
    </table> ) : (
      <div>
      <table className = 'recentCallTable'  style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
      <colgroup>
        <col width = "20%" />
        <col width = "10%" />
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
      </table>
      <hr style={{ margin: '0 7%' }} />
      <ScrollBox>
      <table className = 'recentCallTable'  style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
      <colgroup>
        <col width = "20%" />
        <col width = "10%" />
        <col width = "10%" />
      </colgroup>
      <tbody style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
        {callHistoryList.length === 0 ? <tr><td colSpan={3} style={{ textAlign: 'center' }}>통화 기록이 존재하지 않습니다.</td></tr> :
          callHistoryList.map((callHistory: CallHistory) => (
            <tr key={callHistory.endTime}  >
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
    </table></ScrollBox></div>)}</span>
    </ContextBox>

    <Modal id="messageModel"
        isOpen={isMsgOpen} 
        onRequestClose={(e) => setIsMsgOpen(false)}
        ariaHideApp={false}
        style={{
          content: {
            backgroundColor: localStorage.getItem('theme') === 'detail' ? 'white' : '#001d3d',
            width: '400px',
            height: '300px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
        shouldCloseOnOverlayClick={false}
      >
        <p style={{textAlign: 'center', fontSize: 'xx-large', margin: '5%'}}>{msg}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SmallRedButton id="exitButton" onClick={(e) => setIsMsgOpen(false)} text="닫기" aria-label="창 닫기 버튼"/>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default RecentCalls;