import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registServer } from '../../apis/user';

import Title from '../../components/Title';
import Input from '../../components/InputText';
import RegisterButton from '../../components/RegisterButton';
import CheckBox from '../../components/CheckBox';
import Info from '../../components/InfoText';
import { sendAuthenticationCode } from '../../apis/email';
import { Link } from "react-router-dom";
import styled from "styled-components";

import '../../styles/simple/RegisterContainer.css'

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;


const SimpleSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [handicap, setHandicap] = useState(false); // 기본값을 0으로 설정
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwFlag, setPwFlag] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [emailAuthentication, setEmailAuthentication] = useState(false);
  const [authenticationCode, setAuthenticationCode] = useState('');
  const [userCode, setUserCode] = useState('');

  const userData = {
    userEmail: email,
    userName: name,
    userPass: password,
    userHandicap: handicap ? 1 : 0,
  };

  const handleSignup = async () => {
    let err = false;
    let msg = '';
    // 이메일 정규표현식
    let emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 비밀번호 정규표현식 - 8~15자 영문 숫자 특수문자
    let pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

    if(!email) {
      msg = '이메일을 입력해주세요'; 
      err = true;
    }else if(!err && !email.match(emailReg)){
      msg = '올바른 이메일을 입력해주세요';
      err = true;
    }else if(!err && password.length === 0){
      msg = '비밀번호를 입력해주세요';
      err = true;
    }else if(!err && !password.match(pwReg)) {
      msg = '비밀번호는 8자 이상 15자 이하 영문/특수문자/숫자 조합이어야 합니다'
      err = true;
    }else if(!err && passwordCheck.length === 0){
      msg = '비밀번호 확인을 입력해주세요';
      err = true;
    }else if(!err && !name) {
      msg = '이름을 입력해주세요';
      err = true;
    }else if (!err && !pwFlag) {
      msg = '비밀번호가 일치하지 않습니다';
      err = true;
    }else if (!err && !emailAuthentication) {
      msg = '이메일 인증이 진행되지 않았습니다';
      err = true;
    }

    if (err) {
      alert(msg);
    } else {
      registServer(userData)
        .then((res) => {
          if(res.userEmail === userData.userEmail) {
            alert("가입 완료");
            // 로그인 화면으로 리다이렉트
            RedirectLogin();
          }else{
            console.log("가입 실패");
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  const handleEmailSender = (e: any) => {
    sendAuthenticationCode(email)
      .then((res) => {
        setEmailSend(true);
        setAuthenticationCode(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleEmailAuthentication = (e: any) => {
    if (authenticationCode === userCode) {
      alert("인증 성공");
      setEmailAuthentication(true);
    }else{
      alert("인증 코드가 일치하지 않습니다")
    }
  }

  const handlePasswordCheckChange = (e: any) => {
    setPasswordCheck(e.target.value);
    setPwFlag(e.target.value === password);
  };

  const naviagte = useNavigate();

  const RedirectLogin = () => {
    naviagte('/login');
  }
  // const [isDisabled, setIsDisabled] = useState(false); // 장애 여부 체크 상태를 state로 관리

  return (
    <>
      <StyledLink to='' aria-label='회원가입 페이지입니다.'>
        <Title title='회원가입' aria-label='회원가입 페이지입니다.'/>
      </StyledLink>
      
    <div id='RegisterContainer'>
      <Input 
        type="email"
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        aria-label='이메일 입력 칸입니다. 회원가입을 위한 이메일을 입력해주세요.'
      />
      {!emailSend && !emailAuthentication && <RegisterButton text='이메일 인증 코드 발송' onClick={handleEmailSender} aria-label='회원가입을 위한 이메일 인증 코드 발송 버튼입니다.'/>}
      {emailSend && !emailAuthentication && 
        <>
          <Input 
            type="text"
            placeholder="인증코드 입력"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            aria-label='발송된 인증 코드를 입력해주세요.'
          />
          <RegisterButton text='이메일 인증' onClick={handleEmailAuthentication}/>
        </>
      }
      <Input 
        type="text"
        placeholder="이름" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label='이름 입력 칸입니다. 회원가입을 위해 이름을 입력해주세요.'
      />
      <Input 
        type="password"
        placeholder="비밀번호" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label='비밀번호 입력 칸입니다. 회원가입을 위해 8자 이상, 15자 이하, 그리고 영문, 특수문자, 숫자 조합의 비밀번호를 입력해주세요.'
      />
      <Input 
        type="password"
        placeholder="비밀번호 확인" 
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
        aria-label='비밀번호 확인 칸입니다. 작성하신 비밀번호를 한번 더 입력해주세요.'
      />
      {pwFlag === false && passwordCheck.length !== 0 && <Info text='비밀번호가 일치하지 않습니다.'/>}
      <CheckBox
        label="시각 장애 여부" // 체크박스 옆에 표시될 텍스트
        checked={handicap} // 체크 여부를 state로 전달
        onChange={(e) => setHandicap(e.target.checked)} // 체크 상태가 변경될 때 state 업데이트
        aria-label='사이트 이용의 편의성을 위해 시각 장애 여부를 체크합니다. 기본 상태는 체크가 안된 상태이며 해당되신다면 체크해주세요.'
      />
      
      <RegisterButton text='회원가입' onClick={handleSignup} aria-label='회원가입 버튼입니다.'/>
    </div>
    </>
  );
};

export default SimpleSignup;


