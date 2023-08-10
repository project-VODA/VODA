// App.tsx

import React, { createContext } from 'react';
// import { RootState } from './store/reducers'; // 가정: RootState는 redux store의 전체 상태 타입입니다.
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";

// redux
//import { useAppDispatch, useAppSelector } from "./constants/types";
import { axiosInstance } from "./apis/instance";
import {
  updateAccessToken, updateLoginStatus,
} from "./store/authReducer";


// import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ServerEvent from './components/ServerEvent';

import SimpleHomePage from './pages/simple/HomePage';
import SimpleAbout from './pages/simple/AboutPage';
import SimpleLogin from './pages/simple/LoginPage';
import SimplePass from './pages/simple/TemporaryPassPage';
// 소셜 로그인 - KMJ
import SocialLogin from './pages/simple/LoginRedirectPage';
import SimpleSignup from './pages/simple/SignupPage';
import SimpleMyPage from './pages/simple/MyPage';
import SimpleEnvSettingPage from './pages/simple/EnvSettingPage';
import SimpleVideo from './pages/simple/VideoPage';
import SimpleRoom from './pages/simple/WaitingRoomPage';
import SimpleFeedBack from './pages/simple/FeedBackPage';
import SimpleWriteArticle from './pages/simple/board/WriteArticlePage';
import SimpleDetailArticle from './pages/simple/board/DetailArticlePage';

import DetailHomePage from './pages/detail/HomePage';
import DetailAbout from './pages/detail/AboutPage';
import DetailLogin from './pages/detail/LoginPage';
import DetailPass from './pages/detail/TemporaryPassPage';
import DetailSignup from './pages/detail/SignupPage';
import DetailMyPage from './pages/detail/MyPage';
import DetailEnvSettingPage from './pages/detail/EnvSettingPage';
import DetailVideo from './pages/detail/VideoPage';
import FaceVideo from './pages/detail/faceExpressions';
import DetailRoom from './pages/detail/WaitingRoomPage';
import DetailFeedBack from './pages/detail/FeedBackPage';
import TestPage from './pages/detail/TestPage';


// 스타일 & 모드(mode)
import { GlobalStyle } from './styles/global-styles';
import { SimpleTheme, DetailTheme, Theme } from './styles/theme';
import { useMode } from './hooks/useMode';

import ModeToggle from './components/ModeToggle';
import DetailWriteArticle from './pages/detail/board/WriteArticlePage';
import { styled } from 'styled-components';
import simpleLogo from "./assets/images/logo_yellow.png";
import ErrorPage from './pages/ErrorPage';
import { UserInfoType, UserSettingType } from './store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

// 1) 다수의 props 발생 시 interface 설정
interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// 2) 해당하는 내용에 대해서 작성. contextprops 를 통해 함수형 컴퍼넌트 사용 가능
// typescript & context API 사용 참고
export const ThemeContext = createContext<ContextProps>({
  theme: SimpleTheme,
  toggleTheme: () => {
    return null;
  },
});

const LogoImage = styled.img`
  width: 120px;
  height: auto;
`;

// 화면 사이즈 조정
const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const App: React.FC = () => {
  /*const accessToken = useAppSelector((state) => state.auth.accessToken);
  // 헤더 디폴트 추가
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  const dispatch = useAppDispatch();

  // 토큰 갱신
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;
      const originalRequest = config;
      if (status === 401 && data.error === "TokenExpiredException") {
        try {
          // 갱신 요청
          const res = await axiosInstance.post<any>(`/user/login/token`);
          const newAccessToken = res.data.data.accessToken;
          dispatch(updateAccessToken(newAccessToken));
          // 실패했던 요청 새로운 accessToken으로 헤더 변경하고 재요청
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          // 갱신 실패시 임의 로그아웃 처리
          console.log("갱신실패", err);
          dispatch(updateLoginStatus(false));
          dispatch(updateAccessToken(""));
          <Navigate replace to="/home" />;
        }
      }
      return Promise.reject(error);
    }
  );*/

  const { theme, toggleTheme } = useMode();

  const commonRoutes = [
    { path: '/', element: theme === SimpleTheme ? <LandingPage /> : <LandingPage /> },
    { path: '/home', element: theme === SimpleTheme ? <SimpleHomePage /> : <DetailHomePage /> },
    { path: '/about', element: theme === SimpleTheme ? <SimpleAbout /> : <DetailAbout /> },
    { path: '/login', element: theme === SimpleTheme ? <SimpleLogin /> : <DetailLogin /> },
    // KMJ
    { path: '/pass', element: theme === SimpleTheme ? <SimplePass /> : <DetailPass />},
    { path: '/login/oauth2/kakao/*', element: <SocialLogin /> },
    { path: '/signup', element: theme === SimpleTheme ? <SimpleSignup /> : <DetailSignup /> },
    { path: '/mypage', element: theme === SimpleTheme ? <SimpleMyPage /> : <DetailMyPage /> },
    { path: '/setting', element: theme === SimpleTheme ? <SimpleEnvSettingPage /> : <DetailEnvSettingPage /> },
    { path: '/waiting', element: theme === SimpleTheme ? <SimpleRoom /> : <DetailRoom/> },
    { path: '/', element: <FaceVideo /> },
    { path: '/video', element: theme === SimpleTheme ? <SimpleVideo /> : <DetailVideo /> },
    { path: '/test', element: <TestPage /> },
    { path: '/feedback', element: theme === SimpleTheme ? <SimpleFeedBack/> : <DetailFeedBack/> },
    { path: '/write', element: theme === SimpleTheme ? <SimpleWriteArticle/> : <DetailWriteArticle/> },
    { path: '/view/:articleNo', element: theme === SimpleTheme ? <SimpleDetailArticle/> : <SimpleDetailArticle/> },
    { path: '/error', element: <ErrorPage />},
    { path: '*', element: <Navigate replace to="/" /> },
    
    // { path: '/', element: screenMode === 'simple' ? <SimpleHomePage /> : <DetailHomePage /> },
    // { path: '/about', element: screenMode === 'simple' ? <SimpleAbout /> : <DetailAbout /> },
    // { path: '/login', element: screenMode === 'simple' ? <SimpleLogin /> : <DetailLogin /> },
    // { path: '/mypage', element: screenMode === 'simple' ? <SimpleMyPage /> : <DetailMyPage /> },
    // { path: '/video', element: screenMode === 'simple' ? <SimpleVideo /> : <DetailVideo /> },
    // { path: '*', element: <Navigate replace to="/" /> },
  ];

  // screenMode에 따라서 SimplePage 또는 DetailPage를 렌더링합니다.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContainer>
        <GlobalStyle theme={theme} />
        <Router>
          <ServerEvent />
          {theme === SimpleTheme ? 
          <></> : 
          <Navigation />}
          <ModeToggle />
          <Routes>
            {commonRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<div style={{ marginTop:
                route.path === "/home" ||
                (localStorage.getItem('theme') === 'simple' && route.path === '/color') ||
                (localStorage.getItem('theme') === 'simple' && route.path === '/about') ||
                (localStorage.getItem('theme') === 'simple' && route.path === '/mypage') 
                ? "0" 
                : "63px", }}>{route.element}</div>} />
            ))}
          </Routes>
        </Router>
      </AppContainer>
    </ThemeContext.Provider>
  );
};


export default App;