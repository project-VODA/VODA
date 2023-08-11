import React, { useEffect, useState } from 'react';

import Button from "./SettingButton";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { UserInfoType } from '../store/userSlice';
import { sendCalling } from '../apis/calling';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UserSearchList from "../components/UserSearchList";
// import Button from "../components/SettingButton";
import SmallRedButton from "../components/SmallRedBtn";

import FriendPageButton from '../components/FriendPageBtn'
import DeleteFriendButton from './SmallRedBtn'

// react-icons
import { FiPhoneCall } from "react-icons/fi"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ImUserPlus } from 'react-icons/im'

//API
import { deleteFriend, getFriendList } from '../apis/friend';
import { updateCall } from "../store/callSlice";

import '../styles/detail/DetailWaitingPage.css'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import useErrorHandlers from '../hooks/useError';

type Friend = {
  friendNo: number;
  userEmail: string;
  userName: string;
};

type FriendsList = Friend[];


const FriendList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // redux에서 저장된 정보 가져오기
  const userInfo = useAppSelector((state) => state.user.userInfo);
  
  const [friendList, setFriendList] = useState<FriendsList>([]);

  const navigate = useNavigate();
  const errorhandlers = useErrorHandlers();
  const dispatch = useAppDispatch();

  useEffect(handleFriendList, []);

  function handleFriendList() {
    getFriendList(userInfo.userEmail)
      .then((res: FriendsList) => {
        setFriendList(res);
      })
      .catch((err) => {
        errorhandlers(err.response, handleFriendList);
      })
  }
  

  const handleDeleteFriend = (friend: Friend) => {

    deleteFriend(friend.friendNo)
      .then((res) => {
        alert("친구 삭제 성공");
        handleFriendList();
      })
      .catch((err) => {
        errorhandlers(err.response, handleDeleteFriend, friend);
      })
  }

  const handleCalling = (friend: Friend) => {
    
    const callSendRequest = {
      senderEmail : userInfo.userEmail,
      receiverEmail : friend.userEmail
    }

    sendCalling(callSendRequest)
      .then((res) => {
        console.log(res);
        dispatch(updateCall({
          sessionToken: res.data.sessionToken,
          sessionId: res.data.sessiondId,
          callNo: res.data.callNo
        }));
        if(res.data === "oncalling"){
          navigate('/waiting')
        }else{
          navigate('/video');
        }
      })
      .catch((err) => {
        errorhandlers(err.response, handleCalling);
      });
  };

  return (
    <><>
    <div style={{  display: 'flex', justifyContent: 'flex-end', gap: '40%', margin: '7% 55px 2%'}}>
      <span style={{ fontSize:'1.9vw', fontWeight:'bolder' }}>연락처</span>
      <ImUserPlus onClick={(e) => setModalOpen(true)} style={{ fontSize: '30px', cursor: 'pointer' }} />
    </div>
    <Modal id='customModal'
      isOpen={isModalOpen} 
      onRequestClose={(e) => setModalOpen(false)}
      ariaHideApp={false}
      style={{     
        content: {
          backgroundColor: "#f0f0f0",
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
        <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize:'2.2vw', fontWeight: 'bolder' }}>친구 찾기</span>
        <span style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <SmallRedButton onClick={(e) => setModalOpen(false)} text="X" />
        </span>
      </div>


      <UserSearchList/>
    </Modal>
  </>
      <table className = 'friendTable' style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
        <colgroup>
          <col width = "45%" />
          <col width = "45%" />
          <col width = "10%" />
        </colgroup>
        <thead>
          <tr style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
            <th>이름</th>
            <th>이메일</th>
            <th id='DetailCallContainer'></th>
          </tr>
        </thead>
        <tbody>
          {friendList.length === 0 ? <tr><td colSpan={3} style={{ textAlign: 'center' }}>친구가 존재하지 않습니다.</td></tr> :
            friendList.map((friend: Friend) => (
              <tr key={friend.friendNo} style={{ textAlign: 'center' }}>
                <td>{friend.userName}</td>
                <td>{friend.userEmail}</td>
                <div id='DetailCallContainer'>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '28px', fontSize:'25px'}}>
                <FiPhoneCall style={{ cursor: 'pointer' }} onClick={() => handleCalling(friend)} aria-label={`${friend.userName} 님에게 통화하시려면 버튼을 누르세요.`}/>
                <RiDeleteBin6Line style={{ cursor: 'pointer' }} onClick={() => handleDeleteFriend(friend)} aria-label={`${friend.userName} 님을 친구목록에서 삭제하시려면 버튼을 누르세요.`} />
                </div></div>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FriendList;
