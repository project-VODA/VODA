// 심플모드의 친구찾기 모달

import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import styled from "styled-components";

import SimpleTitle from '../../components/SimpleTitle';
import HandleButton from '../../components/HandleBtn';
import UserSearchList from "../../components/UserSearchList";
import RecentCalls from "../../components/RecentCall";
// import DeleteFriendButton from '../../components/DeleteFriendBtn'
import { searchUser } from "../../apis/friend";
import { sendCalling } from "../../apis/calling";
import SmallRedButton from '../../components/SmallRedBtn'

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

const modalColor = {
  content: {
    backgroundColor: '#001d3d',
  },
}

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
      <StyledLink to='/home' aria-label="영상통화를 걸 친구를 찾는 페이지입니다. 친구 목록과 최근 통화 목록으로 구성되어 있습니다. 홈 페이지로 이동하시려면 이 버튼을, 통화하시려면 맞는 항목을 고르세요.">
        <SimpleTitle tabIndex={0} imgSrc="SimpleLogo" />
      </StyledLink>
      <ButtonContainer>
        <HandleButton tabIndex={1} text='친구검색' onClick={handleFriendModalOpen} />
        <HandleButton tabIndex={2} text='최근통화' onClick={handleRecentCallModalOpen} />
      </ButtonContainer>
      <div id="customModalContainer">
      <Modal id="customModal"
          isOpen={isFriendModalOpen} 
          onRequestClose={(e) => setFriendModalOpen(false)}
          ariaHideApp={false}
          style={ modalColor }
        >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px' }}>
          <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize:'30px', fontWeight: 'bolder' }}>친구 찾기</span>
          <span style={{display: 'flex', justifyContent: 'flex-end'}}>
            <SmallRedButton onClick={(e) => setFriendModalOpen(false)} text="X" aria-label="창 닫기 버튼" />
          </span></div>
        <UserSearchList/>
      </Modal>
      <Modal id="customModal"
          isOpen={isRecentCallModalOpen} 
          onRequestClose={(e) => setRecentCallModalOpen(false)}
          ariaHideApp={false}
          style={ modalColor }
        >
        <span style={{display: 'flex', justifyContent: 'flex-end'}}>
          <SmallRedButton onClick={(e) => setRecentCallModalOpen(false)} text="X" aria-label="창 닫기 버튼"/>
        </span>
        <RecentCalls/>
      </Modal>
      </div>
    </>
  );
};

export default SimpleRoom;
