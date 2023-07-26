// store/reducers.ts

import { ActionTypes } from './actions';

// RootState 정의
export interface RootState {
  screenMode: 'simple' | 'detail';
}

// 로컬스토리지 키 값
const LOCAL_STORAGE_KEY = 'screen_mode';

// 초기 상태
// const initialState: RootState = {
//   screenMode: 'simple', // 기본값은 'simple'로 설정합니다.
// };

const initialState: RootState = {
  screenMode: (localStorage.getItem(LOCAL_STORAGE_KEY) as 'simple' | 'detail') || 'simple', // 기본값은 로컬 스토리지 값 또는 'simple'로 설정합니다.
};

// 리듀서 함수
const rootReducer = (state = initialState, action: any): RootState => {
  switch (action.type) {
    case ActionTypes.SET_SCREEN_MODE:
      // 로컬스토리지에 저장
      localStorage.setItem(LOCAL_STORAGE_KEY, action.payload);
      return {
        ...state,
        screenMode: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;