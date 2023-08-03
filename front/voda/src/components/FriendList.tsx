import React, { useEffect, useState } from 'react';
import { deleteFriend, getFriendList } from '../apis/friend';

import Button from "./SettingButton";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserInfoType } from '../store/userSlice';
import { sendCalling } from '../apis/calling';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UserSearchList from "../components/UserSearchList";
// import Button from "../components/SettingButton";
import RedButton from "../components/DeleteButton";

import FriendPageButton from '../components/FriendPageBtn'
import DeleteFriendButton from '../components/DeleteFriendBtn'

// react-icons
import { FiPhoneCall } from "react-icons/fi"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ImUserPlus } from 'react-icons/im'

import '../styles/detail/DetailWaitingPage.css'

type Friend = {
  friendNo: number;
  userEmail: string;
  userName: string;
};

type FriendsList = Friend[];


const FriendList = () => {
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

  // redux에서 저장된 정보 가져오기
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })
  
  const [friendList, setFriendList] = useState<FriendsList>([]);

  useEffect(() => {
    getFriendList(userInfo.userEmail)
      .then((res: FriendsList) => {
        setFriendList(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const navigate = useNavigate();

  const handleDeleteFriend = (friend: Friend) => {

    deleteFriend(friend.friendNo)
      .then((res) => {
        alert("친구 삭제 성공");
        getFriendList(userInfo.userEmail)
          .then((res: FriendsList) => {
            setFriendList(res);
          })
          .catch((err) => {
            console.error(err);
          })
      })
      .catch((err) => {
        console.error(err);
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
        if(res.data === "oncalling"){
          navigate('/waiting')
        }else{
          navigate('/video',{
            state: {
              sessionToken : `${res.data.sessionToken}`,
              callNo : `${res.data.callNo}`
            }
          });
        }
        
      })
      .catch((err) => {
        if(err===204){
          alert("!!");
        }
        console.error(err);
      });
  };

  return (
    <><>
    <div style={{  display: 'flex', justifyContent: 'flex-end', gap: '40%', margin: '7% 55px 2%'}}>
      <span style={{ fontSize:'28px', fontWeight:'bolder' }}>연락처</span>
      <ImUserPlus onClick={(e) => setModalOpen(true)} style={{ fontSize: '30px', cursor: 'pointer' }} />
    </div>
    <Modal 
      isOpen={isModalOpen} 
      onRequestClose={(e) => setModalOpen(false)}
      ariaHideApp={false}
    >
      <RedButton onClick={(e) => setModalOpen(false)} text="X" />
      <UserSearchList/>
    </Modal>
  </>
      <table className = 'friendTable' style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
        <colgroup>
          <col width = "45%" />
          <col width = "45%" />
          <col width = "10%" />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {friendList.length === 0 ? <tr><td colSpan={3}>친구가 존재하지 않습니다.</td></tr> :
            friendList.map((friend: Friend) => (
              <tr key={friend.friendNo} style={{ textAlign: 'center' }}>
                <td>{friend.userName}</td>
                <td>{friend.userEmail}</td>
                <div id='DetailCallContainer'>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '28px', fontSize:'25px'}}>
                <FiPhoneCall onClick={() => handleCalling(friend)} aria-label={`${friend.userName} 님에게 통화하시려면 버튼을 누르세요.`}/>
                <RiDeleteBin6Line onClick={() => handleDeleteFriend(friend)} aria-label={`${friend.userName} 님을 친구목록에서 삭제하시려면 버튼을 누르세요.`} />
                </div>
                </div>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FriendList;
