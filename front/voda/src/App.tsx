// App.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducers'; // 가정: RootState는 redux store의 전체 상태 타입입니다.
import SimplePage from './pages/SimplePage';
import DetailPage from './pages/DetailPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  // redux store의 screenMode 상태를 가져옵니다.
  const screenMode = useSelector((state: RootState) => state.screenMode);

  // screenMode에 따라서 SimplePage 또는 DetailPage를 렌더링합니다.
  return (
    <div>
      <Navbar />
      {screenMode === 'simple' && <SimplePage />}
      {screenMode === 'detail' && <DetailPage />}
    </div>
  );
};

export default App;