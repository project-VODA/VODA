import React, { useEffect, useState } from 'react';
import { getFriendList } from '../apis/friend';

type Friend = {
  userEmail: string;
  userName: string;
  isFriend: boolean;
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
              <tr key={friend.userName}>
                <td text-align='center'>{friend.userName}</td>
                <td text-align='center'>{friend.userEmail}</td>
                <td text-align='center'>X</td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FriendList;
