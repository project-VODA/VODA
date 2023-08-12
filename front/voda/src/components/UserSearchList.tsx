import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { sendCalling } from "../apis/calling";
import { useNavigate } from "react-router-dom";

import { UserInfoType } from "../store/userSlice";

import SmallYellowButton from "../components/SmallYellowBtn"
import Button from "./SettingButton";
import RedButton from "./DeleteButton"
import Input from "./InputText";
import SmallRedButton from '../components/SmallRedBtn'
import { deleteFriend, registFriend, searchUser } from "../apis/friend";

import '../styles/simple/SimpleWaitingPage.css'
import { updateCall } from "../store/callSlice";
import useErrorHandlers from "../hooks/useError";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import Modal from 'react-modal';

const inputColor = {
  backgroundColor: 'white',
  marginTop: '28px',
};

const SimpleModal = {
  content: {
    backgroundColor: '#001d3d',
  },
}

const DetailModal = {
  content: {
    backgroundColor: '#fff',
  },
}


type User = {
  userEmail: string;
  userName: string;
  friend: boolean;
  friendNo: number;
};

type UserList = User[];

const UserSearchList = () => {
  // redux에서 저장된 정보 가져오기
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [keyword, setKeyword] = useState('');
  const [userList, setUserList] = useState<UserList>([]);
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const userSearchRequest = {
    keyword: keyword,
    userEmail: userInfo.userEmail,
  };

  const errorHandlers = useErrorHandlers();

  useEffect(() => {
    handleSearchUser();
  }, [keyword]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCalling = (user: User) => {
    const callSendRequest = {
      senderEmail: userInfo.userEmail,
      receiverEmail: user.userEmail
    }

    sendCalling(callSendRequest)
      .then((res) => {
        //console.log(res);
        const msg = res.data;

        if(msg=="senderOn"){
          setMsg("자신에게 걸려온 통화가 있는지 확인하세요");
          setIsMsgOpen(true);
        } else if( msg=="receiverOn"){
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
        errorHandlers(err.response, handleCalling, user);
      });
  };

  const handleRegistFriend = (user: User) => {
    const friendRegistRequest = {
      userEmail: userInfo.userEmail,
      friendEmail: user.userEmail,
    };
    registFriend(friendRegistRequest)
      .then((res) => {
        alert("친구 추가 성공");
        handleSearchUser();
      })
      .catch((err) => {
        errorHandlers(err.response, handleRegistFriend, user);
      })
  };

  const handleDeleteFriend = (user: User) => {

    deleteFriend(user.friendNo)
      .then((res) => {
        alert("친구 삭제 성공");
        handleSearchUser();
      })
      .catch((err) => {
        errorHandlers(err.response, handleDeleteFriend, user);
      })
  }

  const handleSearchUser = () => {
    searchUser(userSearchRequest)
      .then((res) => {
        setUserList(res);
      })
      .catch((err) => {
        errorHandlers(err.response, handleSearchUser);
      })
  }

  return (
    <>
      <Input
        type="text"
        placeholder="친구 이름 혹은 이메일을 입력하는 칸입니다."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={inputColor}
        tabIndex={0}
      />
      <table id="tbodyContainer" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '28px'}}>
        {/* <colgroup>
          <col width="30%" />
          <col width="30%" />
          <col width="40%" />
        </colgroup> */}
        <tbody id="FriendContainer" tabIndex={2}>
          {userList.length === 0 ? (
            <tr>
              <td colSpan={3}>검색 결과가 없습니다.</td>
            </tr>
          ) : (
            userList.map((user: User) => (
              <tr key={user.userEmail}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                  <Button className="callButton" onClick={() => handleCalling(user)} text="통화" aria-label={`${user.userName} 님에게 통화하시려면 버튼을 누르세요.`}/>
                    {user.friend ? (
                      <RedButton className="delButton" onClick={() => handleDeleteFriend(user)} text="삭제" aria-label={`${user.userName} 님을 친구목록에서 삭제하시려면 버튼을 누르세요.`} />
                    ) : (
                      <Button className="addButton" onClick={() => handleRegistFriend(user)} text="추가" aria-label={`${user.userName} 님을 친구목록에 추가 하시려면 버튼을 누르세요.`} />
                    )}
                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal id="messageModel"
        isOpen={isMsgOpen} 
        onRequestClose={(e) => setIsMsgOpen(false)}
        ariaHideApp={false}
        style={{
          content: {
            backgroundColor: localStorage.getItem('theme') === 'detail' ? 'white' : '#001d3d',
            width: '400px', // Adjust the width as needed
            height: '300px', // Adjust the height as needed
            margin: 'auto', // Center the modal
            display: 'flex', // Flex container
            flexDirection: 'column', // Stack content vertically
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
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

    </>
  );
};

export default UserSearchList;