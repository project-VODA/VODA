import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

import Title from '../../components/Title';
import DivideContainer from '../../components/DivideHorizontalContainer'
import FriendList from "../../components/FriendList";
import RecentCalls from "../../components/RecentCall";
import UserSearchList from "../../components/UserSearchList";
import Button from "../../components/SettingButton";
import RedButton from "../../components/DeleteButton";
import Input from "../../components/InputText";

import { searchUser } from "../../apis/friend";
import { sendCalling } from "../../apis/calling";

type User = {
  userEmail: string;
  userName: string;
  friend: boolean;
};

type UserList = User[];

const SimpleRoom = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 닫힐 때 친구 목록 갱신 필요, 리덕스 이용해야 함.. 
  // isModalOpen을 FriendList 컴포넌트로 넘기는 식이 이상적일듯

  // useEffect(() => {
  //   getFriendList(sessionStorage.getItem("userEmail"))
  //         .then((res: FriendsList) => {
  //           setFriendList(res);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         })
  // }, [isModalOpen])
  
  const [keyword, setKeyword] = useState('');
  const [userList, setUserList] = useState<UserList>([]);

  const navigate = useNavigate();
  
  const userSearchRequest = {
    keyword: keyword,
    userEmail: sessionStorage.getItem("userEmail"),
  };

  // 통화 연결시 전달객체
  let callSendRequest = {
    senderEmail : "",
    receiverEmail : ""
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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setKeyword('');
    setUserList([]);
  };

  const handleCalling = (user: User) => {
    callSendRequest = {
      senderEmail : sessionStorage.getItem("userEmail"),
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

  const handleRegistFriend = () => {

  };

  return (
    <>
      <Title title="영상통화" />
      
      <DivideContainer
        leftChild={<FriendList></FriendList>}
        rightChild={<RecentCalls></RecentCalls>}
      />
      <>
        <Button onClick={(e) => setModalOpen(true)} text="친구찾기" />
        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={(e) => setModalOpen(false)}
          ariaHideApp={false}
        >
          <RedButton onClick={(e) => setModalOpen(false)} text="X" />
          <UserSearchList/>
          <Input 
            type="text"
            placeholder="검색어"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <RedButton onClick={handleCloseModal} text="X" />
          <table>
            <colgroup>
              <col width = "40%" />
              <col width = "40%" />
              <col width = "20%" />
            </colgroup>
            <tbody>
              {userList.length === 0 ? <tr><td colSpan={3}>검색 결과가 없습니다.</td></tr> : 
                userList.map((user : User) => (
                  <tr key={user.userName}>
                    <td>{user.userName}</td>
                    <td>{user.userEmail}</td>
                    <td>{user.friend ? <Button onClick={() => handleCalling(user)} text="통화 걸기" /> : <Button onClick={handleRegistFriend} text="친구추가" />}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal>
      </>
    </>
  );
};

export default SimpleRoom;
