import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserInfoType } from '../store/userSlice';
import { sendCalling } from '../apis/calling';
import { useNavigate } from 'react-router-dom';

import FriendPageButton from '../components/FriendPageBtn'
import DeleteFriendButton from '../components/DeleteFriendBtn'

type Friend = {
  friendNo: number;
  userEmail: string;
  userName: string;
};

type FriendsList = Friend[];

const FriendList = () => {
  // redux에서 저장된 정보 가져오기
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })
  
  const [friendList, setFriendList] = useState<FriendsList>([]);

  useEffect(() => {
    getFriendList(userInfo.userEmail)
      .then((res: FriendsList) => {
        setFriendList(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const navigate = useNavigate();

  const handleDeleteFriend = (friend: Friend) => {

    deleteFriend(friend.friendNo)
      .then((res) => {
        alert("친구 삭제 성공");
        getFriendList(userInfo.userEmail)
          .then((res: FriendsList) => {
            setFriendList(res);
          })
          .catch((err) => {
            console.error(err);
          })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleCalling = (friend: Friend) => {
    
    const callSendRequest = {
      senderEmail : userInfo.userEmail,
      receiverEmail : friend.userEmail
    }

    sendCalling(callSendRequest)
      .then((res) => {
        console.log(res);
        if(res.data === "oncalling"){
          navigate('/waiting')
        }else{
          navigate('/video',{
            state: {
              sessionToken : `${res.data.sessionToken}`,
              callNo : `${res.data.callNo}`
            }
          });
        }
        
      })
      .catch((err) => {
        if(err===204){
          alert("!!");
        }
        console.error(err);
      });
  };

  return (
    <>
      <table className = 'friendTable'>
        <colgroup>
          <col width = "45%" />
          <col width = "45%" />
          <col width = "10%" />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {friendList.length === 0 ? <tr><td colSpan={3}>친구가 존재하지 않습니다.</td></tr> :
            friendList.map((friend: Friend) => (
              <tr key={friend.friendNo}>
                <td text-align='center'>{friend.userName}</td>
                <td text-align='center'>{friend.userEmail}</td>
                <td text-align='center'><FriendPageButton onClick={() => handleCalling(friend)} text="통화" aria-label={`${friend.userName} 님에게 통화하시려면 버튼을 누르세요.`}/></td>
                <td text-align='center'><DeleteFriendButton onClick={() => handleDeleteFriend(friend)} text="삭제" aria-label={`${friend.userName} 님을 친구목록에서 삭제하시려면 버튼을 누르세요.`} /></td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FriendList;
