import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Title from '../../components/Title';
import HandleButton from '../../components/HandleBtn';
import RedButton from "../../components/DeleteButton";
import UserSearchList from "../../components/UserSearchList";
import RecentCalls from "../../components/RecentCall";
import { searchUser } from "../../apis/friend";
import { sendCalling } from "../../apis/calling";
import DeleteFriendButton from '../../components/DeleteFriendBtn'

import '../../styles/simple/SimpleWaitingPage.css'

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimpleRoom = () => {
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);
  const [isRecentCallModalOpen, setRecentCallModalOpen] = useState(false);

  const handleFriendModalOpen = () => {
    setFriendModalOpen(true);
  }

  const handleRecentCallModalOpen = () => {
    setRecentCallModalOpen(true);
  }

  return (
    <>
      <StyledLink to='' aria-label="영상통화를 걸 친구를 찾는 페이지입니다.">
        <Title title="Friend" />
      </StyledLink>
      <ButtonContainer>
        <HandleButton text='친구검색' onClick={handleFriendModalOpen} />
        <HandleButton text='최근통화' onClick={handleRecentCallModalOpen} />
      </ButtonContainer>
      <div id="customModalContainer">
      <Modal id="customModal"
          isOpen={isFriendModalOpen} 
          onRequestClose={(e) => setFriendModalOpen(false)}
          ariaHideApp={false}
        >
        <span style={{display: 'flex', justifyContent: 'flex-end'}}>
          <DeleteFriendButton onClick={(e) => setFriendModalOpen(false)} text="X" aria-label="창 닫기 버튼" />
        </span>
        <UserSearchList/>
      </Modal>
      <Modal id="customModal"
          isOpen={isRecentCallModalOpen} 
          onRequestClose={(e) => setRecentCallModalOpen(false)}
          ariaHideApp={false}
        >
        <span style={{display: 'flex', justifyContent: 'flex-end'}}>
          <DeleteFriendButton onClick={(e) => setRecentCallModalOpen(false)} text="X" aria-label="창 닫기 버튼"/>
        </span>
        <RecentCalls/>
      </Modal>
      </div>
    </>
  );
};

export default SimpleRoom;
