import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Title from '../../components/Title';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';
import { getUserInfo } from '../../apis/user';
import Info from '../../components/InfoText';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


const SimpleMyPage = () => {

  const [email, setEmail] = useState('');
  const [originPassword, setOriginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [handicap, setHandicap] = useState(false); // 기본값을 0으로 설정
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwFlag, setPwFlag] = useState(false);

  const userData = {
    userEmail: email,
    userName: name,
    userPass: password,
    userHandicap: handicap ? 1 : 0,
  };

  useEffect(() => {

    getUserInfo(sessionStorage.getItem("userEmail"))
      .then((res) => {
        setEmail(res.userEmail);
        setName(res.userName);
        setHandicap(res.userHandicap);
      })
      .catch((err) => {
        console.log(err);
      })
  })

  const handleModify = () => {
    
  }

  const handleWithdrawal = () => {

  }

  const handleChangePassword = () => {

  }

  const handlePasswordCheckChange = (e: any) => {
    setPasswordCheck(e.target.value);
    setPwFlag(e.target.value === password);
  };

  return (
    <>
      <Title title='마이페이지' />

      <Input 
        type="password"
        placeholder="기존 비밀번호"
        value={originPassword}
        onChange={(e) => setOriginPassword(e.target.value)}
      />
      <Input 
        type="password"
        placeholder="새 비밀번호" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input 
        type="password"
        placeholder="새 비밀번호 확인" 
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
      />
      {pwFlag === false && passwordCheck.length !== 0 && <Info text='비밀번호가 일치하지 않습니다.'/>}
      <ButtonContainer>
        <SettingButton text='비밀번호 변경' onClick={handleChangePassword}/>
      </ButtonContainer>
      
      <hr/>
      <Input 
        type="email"
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input 
        type="text"
        placeholder="이름" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CheckBox
        label="시각 장애 여부" // 체크박스 옆에 표시될 텍스트
        checked={handicap} // 체크 여부를 state로 전달
        onChange={(e) => setHandicap(e.target.checked)} // 체크 상태가 변경될 때 state 업데이트
      />

      <ButtonContainer>
        <SettingButton text='정보 수정' onClick={handleModify}/>
        <DeleteButton text='회원 탈퇴' onClick={handleWithdrawal}/>
      </ButtonContainer>
    </>
  );
};

export default SimpleMyPage;
