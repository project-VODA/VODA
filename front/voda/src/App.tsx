// App.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducers'; // 가정: RootState는 redux store의 전체 상태 타입입니다.
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Navbar from './components/Navbar';

import SimpleHomePage from './pages/simple/HomePage';
import SimpleAbout from './pages/simple/About';
import SimpleLogin from './pages/simple/Login';
import SimpleMyPage from './pages/simple/MyPage';

import DetailHomePage from './pages/detail/HomePage';
import DetailAbout from './pages/detail/About';
import DetailLogin from './pages/detail/Login';
import DetailMyPage from './pages/detail/MyPage';


const App: React.FC = () => {
  // redux store의 screenMode 상태를 가져옵니다.
  const screenMode = useSelector((state: RootState) => state.screenMode);

  // screenMode에 따라서 SimplePage 또는 DetailPage를 렌더링합니다.
  return (
    <Router>
      <Navbar />
      {screenMode === 'simple' && (
        <Routes>
          <Route
            path="/"
            element={<SimpleHomePage />}
          />
          <Route
            path="/about"
            // path="/about/*"
            element={<SimpleAbout />}
          />
          <Route
            path="/login"
            element={<SimpleLogin />}
          />
          <Route
            path="/mypage"
            element={<SimpleMyPage />}
          />
          <Route
            path='*'
            element={<Navigate replace to="/"/>}
          />
        </Routes>
      )}
      {screenMode === 'detail' && (
        <Routes>
          <Route
            path="/"
            element={<DetailHomePage />}
          />
          <Route
            path="/about"
            // path="/about/*"
            element={<DetailAbout />}
          />
          <Route
            path="/login"
            element={<DetailLogin />}
          />
          <Route
            path="/mypage"
            element={<DetailMyPage />}
          />
          <Route
            path='*'
            element={<Navigate replace to="/"/>}
          />
        </Routes>
      )}
    </Router>
  );
};

export default App;