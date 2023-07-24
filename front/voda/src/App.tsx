// App.tsx

import React, { createContext } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/reducers'; // 가정: RootState는 redux store의 전체 상태 타입입니다.
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// import Navbar from './components/Navbar';
import Navigation from './components/Navigation';

import SimpleHomePage from './pages/simple/HomePage';
import SimpleAbout from './pages/simple/AboutPage';
import SimpleLogin from './pages/simple/LoginPage';
import SimpleSignup from './pages/simple/SignupPage';
import SimpleMyPage from './pages/simple/MyPage';
import SimpleVideo from './pages/simple/VideoPage';

import DetailHomePage from './pages/detail/HomePage';
import DetailAbout from './pages/detail/About';
import DetailLogin from './pages/detail/Login';
import DetailSignup from './pages/detail/Signup';
import DetailMyPage from './pages/detail/MyPage';
import DetailVideo from './pages/detail/Video';

// import './styles/simple/common.css';
// import './styles/detail/common.css';

import { GlobalStyle } from './styles/global-styles';
import { SimpleTheme, DetailTheme, Theme } from './styles/theme';
import { useMode } from './hooks/useMode';

import ModeToggle from './components/ModeToggle';

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


const App: React.FC = () => {
  // redux store의 screenMode 상태를 가져옵니다.
  // const screenMode = useSelector((state: RootState) => state.screenMode);

  const { theme, toggleTheme } = useMode();

  const commonRoutes = [
    { path: '/', element: theme === SimpleTheme ? <SimpleHomePage /> : <DetailHomePage /> },
    { path: '/about', element: theme === SimpleTheme ? <SimpleAbout /> : <DetailAbout /> },
    { path: '/login', element: theme === SimpleTheme ? <SimpleLogin /> : <DetailLogin /> },
    { path: '/signup', element: theme === SimpleTheme ? <SimpleSignup /> : <DetailSignup /> },
    { path: '/mypage', element: theme === SimpleTheme ? <SimpleMyPage /> : <DetailMyPage /> },
    { path: '/video', element: theme === SimpleTheme ? <SimpleVideo /> : <DetailVideo /> },
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
      <>
        <GlobalStyle theme={theme === SimpleTheme ? SimpleTheme : DetailTheme} />
        <Router>
          <Navigation />
          <ModeToggle />
          <Routes>
            {commonRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </>
    </ThemeContext.Provider>
  );
};

export default App;