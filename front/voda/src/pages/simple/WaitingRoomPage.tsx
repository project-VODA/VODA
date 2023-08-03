import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

import Title from '../../components/Title';
import HandleButton from '../../components/HandleBtn';

import { searchUser } from "../../apis/friend";
import { sendCalling } from "../../apis/calling";

import { Link } from "react-router-dom";
import styled from "styled-components";


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
    
  }

  const handleRecentCallModalOpen = () => {

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

    </>
  );
};

export default SimpleRoom;
