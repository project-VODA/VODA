import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";
import { getRecentCallList } from '../apis/calling';


type CallHistory = {
  callSender: string;
  callReceiver: string;
  callStartTime: string;
  callEndTime: string;
};

type CallHistoryList = CallHistory[];


const RecentCalls = () => {
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

  const handleCalling = (callHistory: CallHistory) => {

  };

  return (
    <>
      <table className = 'recentCallTable'>
        <colgroup>
          <col width = "25%" />
          <col width = "25%" />
          <col width = "25%" />
          <col width = "25%" />
        </colgroup>
        <thead>
          <tr>
            <th>송신자</th>
            <th>수신자</th>
            <th>통화날짜</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {callHistoryList.length === 0 ? <tr><td colSpan={3}>통화 기록이 존재하지 않습니다.</td></tr> :
            callHistoryList.map((callHistory: CallHistory) => (
              <tr key={callHistory.callSender}>
                <td text-align='center'>{callHistory.callSender}</td>
                <td text-align='center'>{callHistory.callReceiver}</td>
                <td text-align='center'>{callHistory.callStartTime}</td>
                <td text-align='center'><Button text="통화" onClick={() => handleCalling(callHistory)}/></td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecentCalls;