import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";
import { getRecentCallList, sendCalling } from '../apis/calling';
import { userInfo } from 'os';
import { UserInfoType } from '../store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';


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
      <table className = 'recentCallTable'>
        <colgroup>
          <col width = "40%" />
          <col width = "40%" />
          <col width = "20%" />
        </colgroup>
        <thead>
          <tr>
            <th>대상</th>
            <th>통화시간</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {callHistoryList.length === 0 ? <tr><td colSpan={3}>통화 기록이 존재하지 않습니다.</td></tr> :
            callHistoryList.map((callHistory: CallHistory) => (
              <tr key={callHistory.startTime}>
                <td text-align='center'>{callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverName : callHistory.senderName}</td>
                <td text-align='center'>{callHistory.startTime}</td>
                <td text-align='center'><Button text="통화" onClick={() => handleCalling(callHistory.senderEmail === userInfo.userEmail ? callHistory.receiverEmail : callHistory.senderEmail)}/></td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecentCalls;