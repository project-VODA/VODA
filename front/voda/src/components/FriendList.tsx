import React, { useEffect, useState } from 'react';
import { sendCalling } from '../apis/calling';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UserSearchList from "../components/UserSearchList";
import SmallRedButton from "../components/SmallRedBtn";

// react-icons
import { FiPhoneCall } from "react-icons/fi"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ImUserPlus } from 'react-icons/im'
import { FiX } from 'react-icons/fi'

//API
import { deleteFriend, getFriendList } from '../apis/friend';
import { updateCall } from "../store/callSlice";

import '../styles/detail/DetailWaitingPage.css'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import useErrorHandlers from '../hooks/useError';
import Paging from './Paging';

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

  // redux에서 저장된 정보 가져오기
  const userInfo = useAppSelector((state) => state.user.userInfo);
  
  const [friendList, setFriendList] = useState<FriendsList>([]);
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [totalItem, setTotalItem] = useState(0);

  const navigate = useNavigate();
  const errorhandlers = useErrorHandlers();
  const dispatch = useAppDispatch();

  useEffect(handleFriendList, []);

  function handleFriendList() {
    getFriendList(userInfo.userEmail)
      .then((res) => {
        setFriendList(res.data.content);
        setTotalItem(res.data.totalElements);
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
        const msg = res.data;

        if(msg === "senderOn"){
          setMsg("자신에게 걸려온 통화가 있는지 확인하세요");
          setIsMsgOpen(true);
        } else if( msg === "receiverOn"){
          setMsg("상대방이 통화중입니다.");
          setIsMsgOpen(true);
        }else {
          dispatch(updateCall({
            sessionToken: res.data.sessionToken,
            sessionId: res.data.sessiondId,
            callNo: res.data.callNo
          }));
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px' }}>
        <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize:'2.2vw', fontWeight: 'bolder' }}>친구 찾기</span>
        <span style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <FiX onClick={(e) => setModalOpen(false)} style={{ fontSize: '2.5vw' }} />
        </span>
      </div>


      <UserSearchList/>
    </Modal>
  </>
      <table className = 'friendTable' style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
        <colgroup>
          <col width = "20%" />
          <col width = "10%" />
          <col width = "10%" />
        </colgroup>
        <thead>
          <tr style={{ borderCollapse: 'separate', borderSpacing: '0px 20px', fontWeight: 'bold' }}>
            <th>이름</th>
            <th>이메일</th>
            <th id='DetailCallContainer'></th>
          </tr>
        </thead>
      </table>
      <hr style={{ margin: '0 7%' }} />
      <table className = 'friendTable' style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',  }}>
        <colgroup>
          <col width = "20%" />
          <col width = "10%" />
          <col width = "10%" />
        </colgroup>
        <tbody>
          {friendList.length === 0 ? <tr><td colSpan={3} style={{ textAlign: 'center' }}>친구가 존재하지 않습니다.</td></tr> :
            friendList.map((friend: Friend) => (
              <tr key={friend.friendNo} style={{ borderCollapse: 'separate', borderSpacing: '0px 20px',}}>
                <td style={{ paddingLeft: '6vw' }} >{friend.userName}</td>
                <td style={{ paddingLeft: '5vw' }} >{friend.userEmail}</td>
                <div id='DetailCallContainer'>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '28px', fontSize:'25px'}}>
                <FiPhoneCall style={{ cursor: 'pointer' }} onClick={() => handleCalling(friend)} aria-label={`${friend.userName} 님에게 통화하시려면 버튼을 누르세요.`}/>
                <RiDeleteBin6Line style={{ cursor: 'pointer' }} onClick={() => handleDeleteFriend(friend)} aria-label={`${friend.userName} 님을 친구목록에서 삭제하시려면 버튼을 누르세요.`} />
                </div></div>
              </tr>
          ))}
        </tbody>
      </table>

      <Modal id="messageModel"
        isOpen={isMsgOpen} 
        onRequestClose={(e) => setIsMsgOpen(false)}
        ariaHideApp={false}
        style={{
          content: {
            backgroundColor: localStorage.getItem('theme') === 'detail' ? 'white' : '#001d3d',
            width: '400px',
            height: '300px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
        shouldCloseOnOverlayClick={false}
      >
        <p style={{textAlign: 'center', fontSize: 'xx-large', margin: '5%'}}>{msg}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SmallRedButton id="exitButton" onClick={(e) => setIsMsgOpen(false)} text="닫기" aria-label="창 닫기 버튼"/>
          </span>
        </div>
      </Modal>

      {/* <Paging/> */}
    </>
  );
};

export default FriendList;
