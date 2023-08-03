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

import { Link } from "react-router-dom";
import styled from "styled-components";


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const SimpleRoom = () => {
  // const [isModalOpen, setModalOpen] = useState(false);

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
      <StyledLink to='' aria-label="영상통화를 걸 친구를 찾는 페이지입니다.">
        <Title title="Friend" />
      </StyledLink>
      <DivideContainer
        leftChild={<FriendList></FriendList>}
        rightChild={<RecentCalls></RecentCalls>}
      />
    </>
  );
};

export default SimpleRoom;
