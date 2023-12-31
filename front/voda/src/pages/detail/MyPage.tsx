import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';
import { cancelUser, changePassword, getUserInfo, updateUserInfo } from '../../apis/user';
import Info from '../../components/InfoText';
import { updateUserName, } from '../../store/userSlice';
import { Link } from "react-router-dom";
import DetailLogo from "../../components/DetailLogo"
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import useErrorHandlers from '../../hooks/useError';
import useLogOut from '../../hooks/useLogout';


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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailMyPage = () => {
  // redux에서 저장된 정보 가져오기
  const userInfo= useAppSelector((state) => state.user.userInfo);
  // 컴포넌트 지역 변수에 연결
  const [name, setName] = useState(userInfo.userName);
  const [handicap, setHandicap] = useState(false);

  const [originPassword, setOriginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwFlag, setPwFlag] = useState(false);

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorHandlers = useErrorHandlers();
  const logout = useLogOut();

  const userData = {
    userName: name,
    userPass: password,
    userHandicap: handicap ? 1 : 0,
  };

  const changePasswordData = {
    originalPass: originPassword,
    newPass: password,
  };

  useEffect(handleGetUserInfo, []);

  // const RedirectHomePage = () => {
  //   navigate('/home');
  // }

  function handleGetUserInfo() {
    getUserInfo()
      .then((res) => {
        setHandicap(res.userHandicap === 1 ? true : false);
      })
      .catch((err) => {
        errorHandlers(err.response, handleGetUserInfo);
      })
  }

  const handleModify = () => {
    let err = false;
    let msg = '';
    
    if(!err && !name) {
      msg = '이름을 입력해주세요';
      err = true;
    }

    if (err) {
      alert(msg);
    } else {
      handleUpdateUserInfo();
    }
  }

  const handleUpdateUserInfo = () => {
    updateUserInfo(userData)
      .then((res) => {
        alert("회원 정보 수정 완료");
        dispatch(updateUserName(res.userName));
      })
      .catch((err) => {
        errorHandlers(err.response, handleUpdateUserInfo);
      })
  }

  const handleWithdrawal = () => {
    var confirmWithdrawal = window.confirm("정말 탈퇴하시겠습니까?");
    if(confirmWithdrawal) {
      handleCancelUser();
    }
  }

  const handleCancelUser = () => {
    cancelUser()
      .then((res) => {
        alert("회원 탈퇴 성공");
        logout();
      })
      .catch((err) => {
        errorHandlers(err.response, handleCancelUser);
      })
  }

  const handleChangePassword = () => {
    let err = false;
    let msg = '';
    // 비밀번호 정규표현식 - 8~15자 영문 숫자 특수문자
    let pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

    // 비밀번호 유효성 검사
    if(!err && password.length === 0){
      msg = '비밀번호를 입력해주세요';
      err = true;
    }else if(!err && passwordCheck.length === 0){
      msg = '비밀번호 확인을 입력해주세요';
      err = true;
    }else if(!err && !password.match(pwReg)) {
      msg = '비밀번호는 8자 이상 15자 이하 영문/특수문자/숫자 조합이어야 합니다'
      err = true;
    }else if(!err && !pwFlag) {
      msg = '비밀번호가 일치하지 않습니다'
      err = true;
    }

    if(err) {
      alert(msg);
    }else{
      handlePassword();
    }
  }

  const handlePassword = () => {
    changePassword(changePasswordData)
      .then((res) => {
        alert("비밀번호 변경 성공");
        logout();
      })
      .catch((err) => {
        errorHandlers(err.response, handlePassword);
      })
  }

  const handlePasswordCheckChange = (e: any) => {
    setPasswordCheck(e.target.value);
    setPwFlag(e.target.value === password);
  };

  return (
    <>
      <StyledLink to='/home' aria-label='마이페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요'>
        <DetailLogo imgSrc='DetailLogo' aria-live='assertive' aria-label='마이 페이지 입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요'/>
      </StyledLink>
      <Input 
        type="password"
        placeholder="기존 비밀번호"
        value={originPassword}
        onChange={(e) => setOriginPassword(e.target.value)}
        aria-label='비밀번호 변경을 위해 기존의 비밀번호를 입력해주세요.'
      />
      <Input 
        type="password"
        placeholder="새 비밀번호" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label=' 8자 이상, 15자 이하, 그리고 영문, 특수문자, 숫자 조합의 새로운 비밀번호를 입력해주세요.'
      />
      <Input 
        type="password"
        placeholder="새 비밀번호 확인" 
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
        aria-label='비밀번호 확인 칸입니다. 작성하신 비밀번호를 한번 더 입력해주세요.'
      />
      {pwFlag === false && passwordCheck.length !== 0 && <Info text='비밀번호가 일치하지 않습니다.'/>}
      <ButtonContainer>
        <SettingButton text='비밀번호 변경' onClick={handleChangePassword} aria-label='비밀번호 변경 버튼입니다.'/>
      </ButtonContainer>
      
      <br/>
      <br/>
      <br/>
      <Input 
        type="email"
        placeholder="이메일" 
        value={userInfo.userEmail} 
        readonly={true}
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
        aria-label='시각장애 여부를 변경하시려면 체크해주세요'
      />

      <ButtonContainer>
        <SettingButton text='정보 수정' onClick={handleModify}/>
        <DeleteButton text='회원 탈퇴' onClick={handleWithdrawal}/>
      </ButtonContainer>
    </>
  );
};

export default DetailMyPage;
