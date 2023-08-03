import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { userSliceLogin } from "../../store/userSlice";

import { loginServer } from "../../apis/user";
import { Link as TitleLink } from "react-router-dom" ;
import Title from '../../components/Title';
import Input from '../../components/SubmitInputText';
import LoginButton from '../../components/RegisterButton';
import Link from "../../components/TextLink";
import { access } from "fs";

import '../../styles/simple/RegisterContainer.css'
import styled from "styled-components";

const StyledLink = styled(TitleLink)`
text-decoration: none;
color: inherit;
`;

const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    userEmail: email,
    userPass: password,
  };
  const dispatch = useDispatch();
  const HandleLogin = () => {
    
    if (email === '') {
      alert("이메일을 입력해주세요");
    } else if (password === '') {
      alert("비밀번호를 입력해주세요");
    } else {
      loginServer(userData)
        .then((res) => {
          console.log(res);
          alert("로그인 성공");
          // userSlice에 저장
          dispatch(userSliceLogin ({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          })); 
          const sse = new EventSource("http://localhost:8080/voda/subscribe/sunhee3859@naver.com");
          console.log("hi");
          sse.addEventListener("sse", (event) => {
              console.log('start', event);    
        })
          // 메인페이지로 리다이렉트
          RedirectHomePage();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 401 || err.response.status === 404) {
            alert("가입되지 않은 이메일이거나 비밀번호가 틀렸습니다.");
            setEmail('');
            setPassword('');
          } else if (err.response.status === 500) {
            alert("로그인 실패 (서버 에러)");
            setEmail('');
            setPassword('');
          }
        });
    }
  };
  const RedirectTemporaryPass = () => {
    naviagte('/pass')
  }
  
  const naviagte = useNavigate();

  const RedirectHomePage = () => {
    naviagte('/home');
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      HandleLogin();
    }
  };

  return (
    <>
      <StyledLink to='' aria-label="로그인 페이지입니다.">
        <Title title='로그인' />
      </StyledLink>
      <div id='RegisterContainer'>
      <Input
        type="email"
        alt="Input Email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="이메일을 입력하세요"
      />

      <Input
      alt="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="비밀번호를 입력하세요"
      />

      <LoginButton text='비밀번호를 잊으셨나요?' onClick={RedirectTemporaryPass} aria-label="비밀번호 찾기 버튼입니다. 비밀번호 찾기 페이지로 이동합니다."/> 

      <LoginButton text='로그인' onClick={HandleLogin} aria-label="로그인 버튼입니다."/>
      </div>
    </>
  );
};

export default SimpleLogin;