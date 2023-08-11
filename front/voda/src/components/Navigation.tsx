// Navigation.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { useAppSelector } from "../constants/types";

// 로그인 관련
// import { useAppSelector } from "../../constants/types";

import styled from "styled-components";
import { SimpleTheme, Theme } from "../styles/theme";

import detailLogo from "../assets/images/logo_black.png";
import { FiSettings } from "react-icons/fi";
import { HiUser, HiOutlineLogout } from "react-icons/hi";
import { GrUserSettings } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserInfoType, userSliceLogout } from "../store/userSlice";
import { useState } from "react";
import { logout } from "../apis/user";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import useLogOut from "../hooks/useLogout";

// KMJ 스타일 가이드에 대한 설명 - typescript styled-components
// 1) 단일 props 사용 시, props 명 : 타입 지정
// 2) 다수의 props 사용 시 interface 작성
// 2-1) 상속 받는 컴포넌트에 타입 지정 - 하단 참조

interface DropDownMenuProps {
  visible: boolean;
}

const NavContainer = styled("nav")`
  width: 100%;
  height: 63px;
  top: 0;
  display: flex;
  justify-content: center;
  box-shadow: 0px 1px 0px 1px gray;
  align-items: center;
  background-color: #f1f1f1;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
  transition: all 0.5s ease-in-out;
  z-index: 2;

  position: fixed;
  /* opacity: 0.8; */

  display: block; 
  @media (max-width: 768px) {
    display: none; 
  }
`;

const NavContentContainer = styled.div`
  width: 100%;
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between; /* 메뉴 항목들을 일정한 간격으로 배치 */
  white-space: nowrap; /* 메뉴 항목들이 한 줄에 출력되도록 설정 */
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const LogoContainer = styled("button")`
  width: 180px;
  height: 63px;
  border-radius: 30px;
  border: none;
  color: ${({ theme }) => theme.text};
  margin: 0 3vw; /* 메뉴 항목들 사이에 간격을 만듦 */
  &:hover {
    background: #fcfcfc;
    color: ${({ theme }) =>
      theme === SimpleTheme ? theme.mainColor : theme.body};
    transition: all 0.1s ease-in-out;
  }
`;

// 원래는 LoginButton
const ChannelButton = styled("button")`
  width: 120px;
  height: 63px;
  border-radius: 30px;
  /* font-size: 28px; */
  border: none;
  color: ${({ theme }) => theme.text};
  margin: 0 2vw; /* 메뉴 항목들 사이에 간격을 만듦 */
  &:hover {
    background: #fcfcfc;
    color: ${({ theme }) =>
      theme === SimpleTheme ? theme.mainColor : theme.body};
    transition: all 0.1s ease-in-out;
  }
`;

const UserDropDown = styled("button")`
  width: 230px;
  height: 63px;
  border-radius: 30px;
  border: none;
  color: ${({ theme }) => theme.text};
  margin: 0 2vw; /* 메뉴 항목들 사이에 간격을 만듦 */
  &:hover {
    background: #fcfcfc;
    color: ${({ theme }) =>
      theme === SimpleTheme ? theme.mainColor : theme.body};
    transition: all 0.1s ease-in-out;
  }
`;

const MenuLinkContainer = styled("span")`
display: flex;
align-items: center;
text-decoration: none;
color: #282424; 
font-size: 1rem;;
white-space: nowrap;
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bolder;
  font-size: 1.2rem;
`;

const MenuButton = styled("button")`
  text-decoration: none;
  color: inherit;
  font-weight: bolder;
  font-size: 1.2rem;
`

const UserInfoText = styled("span")`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #282424;
  margin: 0 1vw;  
  margin-right: 1vw;
  font-size: 1rem;;
  white-space: nowrap;
`

const HiUserIcon = styled(HiUser)`
  margin-right: 0.5vw;
`;

const DropDownMenu = styled.div<DropDownMenuProps>`
  position: absolute;
  top: 100%;
  right: 2%;
  width: 200px;
  text-align: left;
  background-color: #fff;
  white-space: nowrap; /* 메뉴 항목들이 한 줄에 출력되도록 설정 */
  font-size: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 2;
  a {
    display: block;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: #f1f1f1;
  }
`;

const IconWrapper = styled.div`
  align-items: center;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-right: 1vw;
`;

const MyFiSettings = styled(FiSettings)`
  width: 24px;
  height: 24px;
`

const HamburgerButton = styled.button`
  position: absolute;
  top: 7%;
  right: 10%;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  display: none; /* 처음에는 큰 화면에서 숨깁니다. */
  @media (max-width: 768px) {
    display: block; /* 작은 화면에서 보이도록 합니다. */
  }
`;

export default function Navigation() {
  const [userInfo, isLogin] = useAppSelector((state) => {
    return [state.user.userInfo, state.user.isLogin];
  })

  const [isDropDownVisible, setDropDownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logout = useLogOut();

  const handleDropDownToggle = () => {
    setDropDownVisible((current) => !current);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((current) => !current);
  }

  const RedirectHomePage = () => {
    navigate("/")
  }

  if ( !isLogin ) { 
    return null
  }
  return (
    <>
      <NavContainer>
        <NavContentContainer>
          <LogoContainer>
            <Link to="/home">
              <LogoImage
                src={detailLogo}
                alt="voda_logo"
                aria-label="홈으로 이동, VODA 로고"
              />
            </Link>
          </LogoContainer>
          {/* <TitleContainer color={theme.mainColor}>제목</TitleContainer> */}
          <InfoContainer>
            {/* <ChannelButton theme={theme}>test</ChannelButton> */}
            {/* <ChannelButton theme={theme}><Link to="/about">ABOUT</Link></ChannelButton> */}
            <ChannelButton>
              <MenuLink to="/about">서비스소개</MenuLink>
            </ChannelButton>
            <ChannelButton>
              <MenuLink to="/waiting">영상통화</MenuLink>
            </ChannelButton>
            <ChannelButton>
              <MenuLink to="/feedback">고객의소리함</MenuLink>
            </ChannelButton>
            <ChannelButton>
              <MenuLink to="/video">비디오</MenuLink>
            </ChannelButton>
            <ChannelButton>
              <MenuLink to="/test">테스트</MenuLink>
            </ChannelButton>
            
            <UserDropDown onClick={handleDropDownToggle}>
              { 
                isLogin ? 
                <>
                  <UserInfoText>
                    <IconWrapper>
                      <HiUserIcon />
                    </IconWrapper>
                    {userInfo.userName}님 환영합니다
                  </UserInfoText>
                  <DropDownMenu visible={isDropDownVisible}>
                    {/* 드롭다운 메뉴 내용 */}
                    <MenuLink to="/mypage">
                      <MenuLinkContainer>
                        <IconWrapper>
                          <GrUserSettings/>
                        </IconWrapper>
                        마이페이지
                      </MenuLinkContainer>
                    </MenuLink>
                    <MenuLink to="/setting">
                      <MenuLinkContainer>
                        <IconWrapper>
                          <MyFiSettings/>
                        </IconWrapper>
                        환경설정
                      </MenuLinkContainer>
                    </MenuLink>
                    <MenuButton onClick={logout}>
                      <MenuLinkContainer>
                        <IconWrapper>
                          <HiOutlineLogout/>
                        </IconWrapper>
                        로그아웃
                      </MenuLinkContainer>
                    </MenuButton>
                  </DropDownMenu>
                </> :
                <MenuLink to="/login">로그인</MenuLink> 
              }
            </UserDropDown>
          </InfoContainer>
        </NavContentContainer>
        {/* {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />} */}
      </NavContainer>
      <HamburgerButton onClick={handleMobileMenuToggle}>
        <FaBars size={48} />
      </HamburgerButton>
    </>
  );
}
