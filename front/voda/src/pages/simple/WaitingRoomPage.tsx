import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

import Title from '../../components/Title';
import DivideContainer from '../../components/DivideHorizontalContainer'
import FriendList from "../../components/FriendList";
import RecentCalls from "../../components/RecentCall";
import Input from "../../components/InputText";
import { searchUser } from "../../apis/friend";

type userSearchResponse = {
  userEmail: string;
  userName: string;
  isFriend: boolean;
};

type userList = userSearchResponse[];

const SimpleRoom = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [userResults, setUserResults] = useState<userList>([]);

  useEffect(() => {
    const userSearchRequest = {
      keyword: keyword,
      userEmail: sessionStorage.getItem("userEmail"),
    };

    searchUser(userSearchRequest)
      .then((res) => {
        setUserResults(res);
        console.log(res);
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
    setUserResults([]);
  };

  return (
    <>
      <Title title="영상통화" />
      
      <DivideContainer
        leftChild={<FriendList></FriendList>}
        rightChild={<RecentCalls></RecentCalls>}
      />
      <div>
        <button onClick={handleOpenModal}>친구 찾기</button>
        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={handleCloseModal}
          ariaHideApp={false}
        >
          <h2>Search Results</h2>
          <Input 
            type="text"
            placeholder="검색어"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleCloseModal}>Close</button>
          
          <thead>
            
          </thead>
          <tbody>
            {/* {userResults.map((user : userSearchResponse) => (
              <tr key={user.isFriend ? 1 : 0}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.isFriend ? "전화걸기" : "친구추가"}</td>
              </tr>
            ))} */}
          </tbody>
        </Modal>
      </div>
    </>
  );
};

export default SimpleRoom;
