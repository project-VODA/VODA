import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Title from '../../components/Title';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';
import { cancelUser, changePassword, getUserInfo, logout, updateUserInfo } from '../../apis/user';
import Info from '../../components/InfoText';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserInfoType, userSliceLogout } from '../../store/userSlice';
import { Link } from "react-router-dom";


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


const SimpleMyPage = () => {
  // redux에서 저장된 정보 가져오기
  const [accessToken, userInfo]: [string, UserInfoType] = useSelector((state:RootState) => {
    return [state.user.accessToken, state.user.userInfo];
  })
  // 컴포넌트 지역 변수에 연결
  const [email, setEmail] = useState(userInfo.userEmail);
  const [name, setName] = useState(userInfo.userName);
  const [handicap, setHandicap] = useState(userInfo.userHandicap == "1" ? true : false);

  const [originPassword, setOriginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwFlag, setPwFlag] = useState(false);

  

  const userData = {
    userEmail: email,
    userName: name,
    userPass: password,
    userHandicap: handicap ? 1 : 0,
  };

  const changePasswordData = {
    userEmail: email,
    originalPass: originPassword,
    newPass: password,
  };

  const naviagte = useNavigate();

  const RedirectHomePage = () => {
    naviagte('/home');
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
      updateUserInfo(userData)
        .then((res) => {
          if(res.userEmail === userData.userEmail) {
            alert("회원 정보 수정 완료");
            // 로그아웃 처리
            if(accessToken !== null && accessToken !== ''){
              logout()
              .then((res) => {
                userSliceLogout();
                RedirectHomePage();
              })
              .catch((err) => {
                console.log(err);
              })
            }
            // 홈 화면으로 리다이렉트
            RedirectHomePage();
          }else{
            console.log("회원 정보 수정 실패");
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  const handleWithdrawal = () => {
    var confirmWithdrawal = window.confirm("정말 탈퇴하시겠습니까?");
    if(confirmWithdrawal) {
      cancelUser()
      .then((res) => {
        alert("회원 탈퇴 성공");
        // 로그아웃 처리
        if(accessToken !== null && accessToken !== ''){
          logout()
          .then((res) => {
            userSliceLogout();
            RedirectHomePage();
          })
          .catch((err) => {
            console.log(err);
          })
        }
        // 홈 화면으로 리다이렉트
        RedirectHomePage(); 
      })
      .catch((err) => {
        console.log(err);
      })
    }
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
      console.log(changePasswordData);
      changePassword(changePasswordData)
        .then((res) => {
          alert("비밀번호 변경 성공")
          
          // 로그아웃 처리
          if(accessToken !== null && accessToken !== ''){
            logout()
            .then((res) => {
              console.log("hi logout");
              userSliceLogout();
              RedirectHomePage();
            })
            .catch((err) => {
              console.log(err);
            })
          }
          // 홈 화면으로 리다이렉트
          RedirectHomePage();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const handlePasswordCheckChange = (e: any) => {
    setPasswordCheck(e.target.value);
    setPwFlag(e.target.value === password);
  };

  return (
    <>
      <StyledLink to='' aria-label='마이페이지입니다.'>
        <Title title='마이페이지' aria-label='마이 페이지 입니다.'/>
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
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
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

export default SimpleMyPage;
