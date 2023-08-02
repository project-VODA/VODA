import React, { useEffect, useState } from "react";
import Button from "./SettingButton";
import Input from "./InputText";
import { registFriend, searchUser } from "../apis/friend";
import { UserInfoType } from "../store/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sendCalling } from "../apis/calling";
import { useNavigate } from "react-router-dom";

type User = {
  userEmail: string;
  userName: string;
  friend: boolean;
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
        console.log(res.sessionToken);
        navigate('/video',{
          state: {
            sessionToken : `${res.sessionToken}`,
            callNo : `${res.callNo}`
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
                    <Button onClick={() => handleCalling(user)} text="통화" />
                  ) : (
                    <Button onClick={() => handleRegistFriend(user)} text="친구추가" />
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