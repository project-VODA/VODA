// Navigation.tsx

import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { useAppSelector } from "../constants/types";

// 로그인 관련
// import { useAppSelector } from "../../constants/types";

import styled from "styled-components";
import { ThemeContext } from "../App";
import { SimpleTheme, Theme } from "../styles/theme";

import simpleLogo from "../assets/images/logo_yellow.png";
import detailLogo from "../assets/images/logo_black.png";

// KMJ 스타일 가이드에 대한 설명 - typescript styled-components
// 1) 단일 props 사용 시, props 명 : 타입 지정
// 2) 다수의 props 사용 시 interface 작성
// 2-1) 상속 받는 컴포넌트에 타입 지정 - 하단 참조

interface NavProps {
  navbar: string;
}

const NavContainer = styled("nav")<NavProps>`
  width: 100%;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
  background: ${({ navbar }) => navbar};
  transition: all 0.5s ease-in-out;
`;

const NavContentContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

interface ColorProps {
  color: string;
}

const LogoImage = styled.img`
  width: 120px;
  height: auto;
`;

const TitleContainer = styled("header")<ColorProps>`
  height: 100%;
  font-size: 2rem;
  font-weight: 900;
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const InfoContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

interface ThemeProps {
  theme: Theme;
}

// 원래는 LoginButton
const ChannelButton = styled("button")<ThemeProps>`
  width: 90px;
  height: 40px;
  border-radius: 30px;
  font-size: 14px;
  border: 1px solid #fcfcfc;
  color: ${({ theme }) => theme.text};
  &:hover {
    background: #fcfcfc;
    color: ${({ theme }) =>
      theme === SimpleTheme ? theme.mainColor : theme.body};
    transition: all 0.1s ease-in-out;
  }
`;

// const RegisterButton = styled('button')<ThemeProps>`
//   width: 90px;
//   height: 40px;
//   border-radius: 30px;
//   font-size: 14px;
//   border: 1px solid #fcfcfc;
//   color: ${({ theme }) => theme.text};
//   &:hover {
//     background: #fcfcfc;
//     color: ${({ theme }) =>
//       theme === SimpleTheme ? theme.mainColor : theme.body};
//     transition: all 0.1s ease-in-out;
//   }
// `;

// 임시
const NavLi = styled.li`
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
`;
const LoginBtn = styled.a`
  padding: 1em 0.5em 25px;
`;

export default function Navigation() {
  const { theme } = useContext(ThemeContext);
  const logoSrc = theme === SimpleTheme ? simpleLogo : detailLogo;

  return (
    <NavContainer navbar={theme.navbar}>
      <NavContentContainer>
        <Link to="/home">
          <LogoImage
            src={logoSrc}
            alt="voda_logo"
            aria-label="홈으로 이동, VODA 로고"
          />
        </Link>
        {/* <TitleContainer color={theme.mainColor}>제목</TitleContainer> */}
        <InfoContainer>
          {/* <ChannelButton theme={theme}>test</ChannelButton> */}
          {/* <ChannelButton theme={theme}><Link to="/about">ABOUT</Link></ChannelButton> */}
          <ChannelButton theme={theme}>
            <Link to="/login">LOGIN</Link>
          </ChannelButton>
          <ChannelButton theme={theme}>
            <Link to="/signup">SIGNUP</Link>
          </ChannelButton>
          <ChannelButton theme={theme}>
            <Link to="/video">VIDEO</Link>
          </ChannelButton>
          <ChannelButton theme={theme}>
            <Link to="/mypage">MYPAGE</Link>
          </ChannelButton>
          {/* {isLogin ? (
            <NavLi>
              <ChannelButton theme={theme} >마이페이지</ChannelButton>
            </NavLi>
          ) : (
            <NavLi>
              <ChannelButton theme={theme} >로그인</ChannelButton>
            </NavLi>
          )} */}
        </InfoContainer>
      </NavContentContainer>
      {/* {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />} */}
    </NavContainer>
  );
}
