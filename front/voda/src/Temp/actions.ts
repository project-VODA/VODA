// store/actions.ts

// screenMode 액션 타입
export enum ActionTypes {
  SET_SCREEN_MODE = 'SET_SCREEN_MODE',
}

// screenMode 액션 생성자
export const setScreenMode = (mode: 'simple' | 'detail') => ({
  type: ActionTypes.SET_SCREEN_MODE,
  payload: mode,
});