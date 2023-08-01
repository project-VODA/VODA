import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

import Title from '../../components/Title';
import DivideContainer from '../../components/DivideHorizontalContainer'
import FriendList from "../../components/FriendList";
import RecentCalls from "../../components/RecentCall";
import Button from "../../components/SettingButton";
import RedButton from "../../components/DeleteButton";
import Input from "../../components/InputText";
import { searchUser } from "../../apis/friend";

type User = {
  userEmail: string;
  userName: string;
  friend: boolean;
};

type UserList = User[];

const SimpleRoom = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [userList, setUserList] = useState<UserList>([]);
  
  const userSearchRequest = {
    keyword: keyword,
    userEmail: sessionStorage.getItem("userEmail"),
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

  const handleCalling = () => {

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
        <Button onClick={handleOpenModal} text="친구찾기" />
        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={handleCloseModal}
          ariaHideApp={false}
        >
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
                    <td>{user.friend ? <Button onClick={handleCalling} text="통화 걸기" /> : <Button onClick={handleRegistFriend} text="친구추가" />}</td>
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
