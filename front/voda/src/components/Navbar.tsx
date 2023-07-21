import React from 'react';
import { connect } from 'react-redux';
import { setScreenMode } from '../store/actions';
import { RootState } from '../store/reducers'; // RootState를 가져옵니다.

interface Props {
  screenMode: 'simple' | 'detail'; // screenMode 타입을 RootState에 맞게 변경합니다.
  setScreenMode: (mode: 'simple' | 'detail') => void; // setScreenMode 타입을 RootState에 맞게 변경합니다.
}

const Navbar: React.FC<Props> = ({ screenMode, setScreenMode }) => {
  const handleModeChange = (newMode: 'simple' | 'detail') => {
    setScreenMode(newMode); // 변경된 액션 이름을 사용합니다.
  };

  return (
    <nav>
      <button onClick={() => handleModeChange('simple')}>Simple Mode</button>
      <button onClick={() => handleModeChange('detail')}>Detail Mode</button>
      <p>Current Mode: {screenMode}</p>
      <hr />
    </nav>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    screenMode: state.screenMode,
  };
};

const mapDispatchToProps = {
  setScreenMode, // 변경된 액션 이름을 사용합니다.
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
