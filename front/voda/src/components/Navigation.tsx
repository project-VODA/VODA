import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";
import detailLogo from "../assets/images/logo_black.png";

// Theme
import { SimpleTheme } from "../styles/theme";

import { useAppSelector } from "../hooks/reduxHook";
import useLogOut from "../hooks/useLogout";

// react-icons
import { LuPipette } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { HiUser, HiOutlineLogout } from "react-icons/hi";
import { GrUserSettings, GrInfo, GrFormClose } from "react-icons/gr";
import { FaBars, FaHeadphonesAlt, FaRegPaperPlane } from "react-icons/fa";
import WeatherCurrent from "./weather/WeatherCurrent";

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
  z-index: 1;

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

const LogoImage = styled.img`
  width: 120px;
  height: auto;
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
`;

const HamburgerMenuLinkContainer = styled("span")`
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #282424; 
  font-size: 1.7rem;
  white-space: nowrap;
  margin-bottom: 50px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bolder;
  font-size: 1.2rem;
`;

const HamburgerMenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bolder;
  font-size: 2rem;
  margin-bottom: 40px;
`;

const MenuButton = styled("button")`
  border: none;
  background-color: white;
  font-weight: bolder;
`;

const UserInfoText = styled("span")`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #282424;
  margin: 0 1vw;  
  margin-right: 1vw;
  font-size: 1rem;;
  white-space: nowrap;
`;

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

  button {
    width: 100%;
    display: block;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #f1f1f1;
  }
`;

const MobileMenuContainer = styled.div<DropDownMenuProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 2;
  padding: 50px;
  padding-top: 100px;
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
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  display: none; /* 처음에는 큰 화면에서 숨깁니다. */
  @media (max-width: 768px) {
    display: block; /* 작은 화면에서 보이도록 합니다. */
  }
`;

export default function Navigation() {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const [isDropDownVisible, setDropDownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const logout = useLogOut();

  const handleDropDownToggle = () => {
    setDropDownVisible((current) => !current);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((current) => !current);
    setTimeout(() => {
      setDropDownVisible(isMobileMenuOpen);
    }, 500);
  }

  const toAbout = () => {
    navigate("/about")
  }

  const toWaiting = () => {
    navigate("/waiting")
  }

  const toFeedback = () => {
    navigate("/feedback")
  }

  const toHome = () => {
    navigate("/home")
  }
  
  const toColor = () => {
    navigate("/color")
  }
  
  if ( !isLogin ) { 
    return null
  }
  return (
    <>
      <NavContainer>
        <NavContentContainer>
          <LogoContainer onClick={toHome}>
            <Link to="/home">
              <LogoImage
                src={detailLogo}
                alt="voda_logo"
                aria-label="홈으로 이동, VODA 로고"
              />
            </Link>
          </LogoContainer>
          <InfoContainer>
            <ChannelButton onClick={toAbout}>
              <MenuLink to="/about">서비스 소개</MenuLink>
            </ChannelButton>
            <ChannelButton onClick={toWaiting}>
              <MenuLink to="/waiting">영상 통화</MenuLink>
            </ChannelButton>
            <ChannelButton onClick={toColor}>
              <MenuLink to="/color">색상 인식</MenuLink>
            </ChannelButton>
            <ChannelButton onClick={toFeedback}>
              <MenuLink to="/feedback">고객의 소리함</MenuLink>
            </ChannelButton>
            
            <WeatherCurrent/>
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
      </NavContainer>
      <HamburgerButton onClick={handleMobileMenuToggle}>
        {isMobileMenuOpen ? <GrFormClose size={36} /> : <FaBars size={36} /> }  
      </HamburgerButton>
      <MobileMenuContainer visible={isMobileMenuOpen}>
        <HamburgerMenuLink to="/about" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <GrInfo/>
            </IconWrapper>
            서비스소개
          </HamburgerMenuLinkContainer>
        </HamburgerMenuLink>
        <HamburgerMenuLink to="/waiting" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <FaHeadphonesAlt/>
            </IconWrapper>
            영상통화
          </HamburgerMenuLinkContainer>
        </HamburgerMenuLink>
        <HamburgerMenuLink to="/color" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <LuPipette/>
            </IconWrapper>
            색상인식
          </HamburgerMenuLinkContainer>
        </HamburgerMenuLink>
        <HamburgerMenuLink to="/feedback" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <FaRegPaperPlane/>
            </IconWrapper>
            고객의소리함
          </HamburgerMenuLinkContainer>
        </HamburgerMenuLink>
        <HamburgerMenuLink to="/mypage" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <GrUserSettings/>
            </IconWrapper>
            마이페이지
          </HamburgerMenuLinkContainer>
        </HamburgerMenuLink>
        <HamburgerMenuLink to="/setting" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <MyFiSettings/>
            </IconWrapper>
            환경설정
          </HamburgerMenuLinkContainer>
        </HamburgerMenuLink>
        <HamburgerMenuLink to="/" onClick={handleMobileMenuToggle}>
          <HamburgerMenuLinkContainer>
            <IconWrapper>
              <HiOutlineLogout/>
            </IconWrapper>
            로그아웃
          </HamburgerMenuLinkContainer>
          <MenuButton onClick={logout}>
          </MenuButton>
        </HamburgerMenuLink>
      </MobileMenuContainer>
    </>
  );
}
