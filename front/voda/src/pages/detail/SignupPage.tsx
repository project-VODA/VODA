import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registServer } from '../../apis/user';

import Title from '../../components/Title';
import Input from '../../components/InputText';
import RegisterButton from '../../components/RegisterButton';
import CheckBox from '../../components/CheckBox';
import Info from '../../components/InfoText';
import { sendAuthenticationCode } from '../../apis/email';
import useErrorHandlers from '../../hooks/useError';


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

  const errorHandlers = useErrorHandlers();

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
      handleRegist();
    }
  };

  const handleRegist = () => {
    registServer(userData)
      .then((res) => {
        alert("가입 완료");
        RedirectLogin();
      })
      .catch((err) => {
        errorHandlers(err.response, handleRegist);
      })
  }

  const handleEmailSender = () => {
    sendAuthenticationCode(email)
      .then((res) => {
        setEmailSend(true);
        setAuthenticationCode(res);
      })
      .catch((err) => {
        errorHandlers(err.response, handleEmailSender);
      })
  }

  const handleEmailAuthentication = () => {
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
    naviagte('/');
  }
  // const [isDisabled, setIsDisabled] = useState(false); // 장애 여부 체크 상태를 state로 관리

  return (
    <>
      <Title title='회원가입'/>
      
      <Input 
        type="email"
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      {!emailSend && !emailAuthentication && <RegisterButton text='이메일 인증 코드 발송' onClick={handleEmailSender}/>}
      {emailSend && !emailAuthentication && 
        <>
          <Input 
            type="text"
            placeholder="인증코드 입력"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
          />
          <RegisterButton text='이메일 인증' onClick={handleEmailAuthentication}/>
        </>
      }
      <Input 
        type="text"
        placeholder="이름" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input 
        type="password"
        placeholder="비밀번호" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input 
        type="password"
        placeholder="비밀번호 확인" 
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
      />
      {pwFlag === false && passwordCheck.length !== 0 && <Info text='비밀번호가 일치하지 않습니다.'/>}
      <CheckBox
        label="시각 장애 여부" // 체크박스 옆에 표시될 텍스트
        checked={handicap} // 체크 여부를 state로 전달
        onChange={(e) => setHandicap(e.target.checked)} // 체크 상태가 변경될 때 state 업데이트
      />
      
      <RegisterButton text='회원가입' onClick={handleSignup}/>
    </>
  );
};

export default SimpleSignup;


