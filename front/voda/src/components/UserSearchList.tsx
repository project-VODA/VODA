import React, { useEffect, useState } from "react";
import { UserInfoType } from "../store/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sendCalling } from "../apis/calling";
import { useNavigate } from "react-router-dom";

import Button from "./SettingButton";
import DeleteFriendButton from '../components/DeleteFriendBtn'
import Input from "./InputText";
import { deleteFriend, registFriend, searchUser } from "../apis/friend";


type User = {
  userEmail: string;
  userName: string;
  friend: boolean;
  friendNo: number;
};

type UserList = User[];

const UserSearchList = () => {
  // redux에서 저장된 정보 가져오기
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })

  const [keyword, setKeyword] = useState('');
  const [userList, setUserList] = useState<UserList>([]);
  
  const userSearchRequest = {
    keyword: keyword,
    userEmail: userInfo.userEmail,
  };

  useEffect(() => {
    searchUser(userSearchRequest)
      .then((res) => {
        setUserList(res);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [keyword]);

  const navigate = useNavigate();

  const handleCalling = (user: User) => {
    const callSendRequest = {
      senderEmail : userInfo.userEmail,
      receiverEmail : user.userEmail
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

  const handleRegistFriend = (user: User) => {
    const friendRegistRequest = {
      userEmail: userInfo.userEmail,
      friendEmail: user.userEmail,
    };
    registFriend(friendRegistRequest)
      .then((res) => {
        alert("친구 추가 성공");
        searchUser(userSearchRequest)
          .then((res) => {
            setUserList(res);
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const handleDeleteFriend = (user: User) => {
      
    deleteFriend(user.friendNo)
    .then((res) => {
      alert("친구 삭제 성공");
      searchUser(userSearchRequest)
        .then((res) => {
          setUserList(res);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <Input 
        type="text"
        placeholder="검색어"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <table>
        <colgroup>
          <col width="40%" />
          <col width="40%" />
          <col width="20%" />
        </colgroup>
        <tbody>
          {userList.length === 0 ? (
            <tr>
              <td colSpan={3}>검색 결과가 없습니다.</td>
            </tr>
          ) : (
            userList.map((user: User) => (
              <tr key={user.userEmail}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>
                  {user.friend ? (
                    <>
                      <Button onClick={() => handleCalling(user)} text="통화" />
                      <DeleteFriendButton onClick={() => handleDeleteFriend(user)} text="삭제" aria-label={`${user.userName} 님을 친구목록에서 삭제하시려면 버튼을 누르세요.`} />
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleCalling(user)} text="통화" />
                      <Button onClick={() => handleRegistFriend(user)} text="친구추가" />
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserSearchList;