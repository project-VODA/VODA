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

import Styles from 'react-modal'
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

// const modalColor = {
//   content: {
    
//   },
// }

// const modalStyle: Styles = {
//   content: {
//     backgroundColor: "#001d3d",
//     width: "90%", // 원하는 너비로 조정
//     maxWidth: "unset", // 최대 너비 제거
//     margin: "0 auto", // 가운데 정렬
//     border: "none", // 테두리 제거
//     padding: "20px", // 내부 패딩
//     overflowX: "hidden", // 가로 스크롤 숨김
//     overflowY: "auto", // 세로 스크롤 유지
//   },
// };

const SimpleRoom = () => {
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);
  const [isRecentCallModalOpen, setRecentCallModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
          style={{     
            content: {
              backgroundColor: "#001d3d",
              width: "80vw", // 원하는 너비로 조정
              maxWidth: "unset", // 최대 너비 제거
              margin: "0 auto", // 가운데 정렬
              border: "none", // 테두리 제거
              padding: "20px", // 내부 패딩
              // overflowX: "hidden",
              overflowX: isMobile ? "auto" : "hidden",
              // 가로 스크롤 1500(전체화면 기준 내용이 가려지는 크기) 이하에는 스크롤 생기게
              overflowY: "auto", // 세로 스크롤 유지
            }
          }}
        >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px' }}>
          <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize:'2.4vw', fontWeight: 'bolder' }}>친구 찾기</span>
          <span style={{display: 'flex', justifyContent: 'flex-end'}}>
            <SmallRedButton tabIndex={3} onClick={(e) => setFriendModalOpen(false)} text="X" aria-label="창 닫기 버튼" />
          </span></div>
        <UserSearchList/>
      </Modal>
      <Modal id="customModal"
          isOpen={isRecentCallModalOpen} 
          onRequestClose={(e) => setRecentCallModalOpen(false)}
          ariaHideApp={false}
          style={{
            content: {
              backgroundColor: "#001d3d",
              width: "80vw",
              maxWidth: "unset",
              margin: "0 auto",
              border: "none",
              padding: "20px",
              overflowX: isMobile ? "auto" : "hidden",
              overflowY: "auto",
            }
          }}
        >
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SmallRedButton id="exitButton" onClick={(e) => setRecentCallModalOpen(false)} text="X" aria-label="창 닫기 버튼"/>
        </span>
        <div style={{justifyContent: 'center'}}>
          <RecentCalls/>
        </div>
      </Modal>
      </div>
    </>
  );
};

export default SimpleRoom;
