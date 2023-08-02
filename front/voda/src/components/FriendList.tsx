import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";

type Friend = {
  friendNo: number;
  userEmail: string;
  userName: string;
};

type FriendsList = Friend[];

const FriendList = () => {

  const [friendList, setFriendList] = useState<FriendsList>([]);

  useEffect(() => {
    getFriendList(sessionStorage.getItem("userEmail"))
      .then((res: FriendsList) => {
        setFriendList(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleDeleteFriend = (friend: Friend) => {
    console.log(friend.friendNo);

    deleteFriend(friend.friendNo)
      .then((res) => {
        alert("친구 삭제 성공");
        getFriendList(sessionStorage.getItem("userEmail"))
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

  const handleCalling = () => {

  }

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
                <td text-align='center'><Button onClick={handleCalling} text="통화" /></td>
                <td text-align='center'><Button onClick={() => handleDeleteFriend(friend)} text="친구삭제" /></td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FriendList;
