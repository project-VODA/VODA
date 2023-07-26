// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// redux-persist 패키지 설치 후 persistgate로 데이터 저장, 사용 가능

const store = configureStore({
  // reducer: {}
  reducer: rootReducer,
});

export default store;