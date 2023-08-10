// import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";


// import SimpleTitle from '../components/SimpleTitle';
// import LandingButton from '../components/LandingBtn';
// import { Link } from "react-router-dom";
// import '../styles/simple/common.css'


// const StyledLink = styled(Link)`
// text-decoration: none;
// color: inherit;
// `;


// const ButtonContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   width: 100%
// `;


// const LandingPage = () => {
//   const navigate = useNavigate();
  

//   const theme = window.localStorage.getItem('theme');
//   const simpleModeClick = () => {
//     window.localStorage.setItem('theme', 'simple')
//     // const localTheme = window.localStorage.getItem('theme');
//     //   if (localTheme === 'detail') {
//     //     toggleTheme();
//     //   }
//     navigate('/login');
//     window.location.reload()
//   };

//   const detailModeClick = () => {
//     window.localStorage.setItem('theme', 'detail')
//     // const localTheme = window.localStorage.getItem('theme');
//     //   if (localTheme === 'simple') {
//     //     toggleTheme();
//     //   }
//     //   navigate('/home');
//     navigate('/login');
//     window.location.reload()
//   };

//   return (
//     <>
//     {localStorage.getItem('theme') === 'simple' ? (<StyledLink to='' aria-label="테마를 선택하는 페이지입니다. 시각 장애인을 배려한 심플 모드와 비장애인을 위한 디테일 모드가 있습니다.">
//         <SimpleTitle imgSrc="SimpleLogo" />
//       </StyledLink>): (<div style={{ height: '10.2vh' }}></div>)}
      
//       <ButtonContainer>
//         <LandingButton text='심플 모드' onClick={simpleModeClick} aria-label="심플 모드 적용" />
//         <LandingButton text='디테일 모드' onClick={detailModeClick} aria-label="디테일 모드 적용"/>
//       </ButtonContainer>
//     </>
//   );
// };

// export default LandingPage

import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { userSliceLogin } from "../store/userSlice";

import { loginServer } from "../apis/user";
import { Link as TitleLink } from "react-router-dom" ;
import SimpleTitle from '../components/SimpleTitle';
import Input from '../components/SubmitInputText';
import LoginButton from '../components/RegisterButton';
import Link from "../components/TextLink";
import { access } from "fs";

import '../styles/simple/RegisterContainer.css'
import styled from "styled-components";
import useErrorHandlers from "../hooks/useError";
import { useAppDispatch } from "../hooks/reduxHook";
import { HttpStatusCode } from "axios";

const StyledLink = styled(TitleLink)`
text-decoration: none;
color: inherit;
`;

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    userEmail: email,
    userPass: password,
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === '') {
      alert("이메일을 입력해주세요");
    } else if (password === '') {
      alert("비밀번호를 입력해주세요");
    } else {
      loginServer(userData)
        .then((res) => {
          alert("로그인 성공");
          // userSlice에 저장
          dispatch(userSliceLogin ({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          }));
          // 메인페이지로 리다이렉트
          RedirectHomePage();
        })
        .catch((err) => {
          handleError(err.response.status);
        });
    }
  };
  const RedirectTemporaryPass = () => {
    navigate('/pass')
  }
  

  const handleRegist = () => {
    navigate('/signup')
  }

  const RedirectHomePage = () => {
    navigate('/home');
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleError = (statusCode: HttpStatusCode) => {
    switch(statusCode){
      case HttpStatusCode.Unauthorized:
        alert("이메일과 비밀번호를 확인해주세요");
        break;
      default:
        navigate('/error');
    }
  }

  return (
    <>
      <StyledLink to='' tabIndex={0} aria-label="로그인하시고 저희 보다의 서비스를 이용해보세요." >
        <SimpleTitle onClick="handleImageClick" imgSrc="SimpleLogo" aria-label="" aria-live="assertive"/>
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

      <LoginButton text='로그인' onClick={handleLogin} aria-label="로그인 버튼입니다."/>

      <LoginButton text='회원가입' onClick={handleRegist} aria-label="회원가입 페이지로 이동하는 버튼입니다."/>
      </div>
    </>
  );
};

export default LandingPage;