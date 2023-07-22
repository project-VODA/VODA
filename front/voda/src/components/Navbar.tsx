import React from 'react';
import { connect } from 'react-redux';
import { setScreenMode } from '../store/actions';
import { RootState } from '../store/reducers'; // RootState를 가져옵니다.
import { Link } from 'react-router-dom';

interface Props {
  screenMode: 'simple' | 'detail'; // screenMode 타입을 RootState에 맞게 변경합니다.
  setScreenMode: (mode: 'simple' | 'detail') => void; // setScreenMode 타입을 RootState에 맞게 변경합니다.
}

const Navbar: React.FC<Props> = ({ screenMode, setScreenMode }) => {
  const handleModeChange = () => { // (newMode: 'simple' | 'detail') 원래의 매개변수
    setScreenMode(screenMode === 'simple' ? 'detail' : 'simple'); // 변경된 액션 이름을 사용합니다.
  };

  return (
    <nav>
      <div>
        <button onClick={handleModeChange}>
          {screenMode === 'simple' ? 'Detail Mode' : 'Simple Mode'}
        </button>
        <p>Current Mode: {screenMode}</p>
        {/* <button onClick={() => handleModeChange('simple')}>Simple Mode</button>
        <button onClick={() => handleModeChange('detail')}>Detail Mode</button> */}
      </div>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/login">
          <button>login</button>
        </Link>
        <Link to="/mypage">
          <button>My Page</button>
        </Link>
        <Link to="/video">
          <button>Video</button>
        </Link>
      </div>
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
