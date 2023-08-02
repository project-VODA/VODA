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
        </Modal>
      </>
    </>
  );
};

export default SimpleRoom;
