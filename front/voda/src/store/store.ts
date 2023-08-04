// import storage from "redux-persist/lib/storage";
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authReducer from './authReducer';
// // import myDanceRuducer from "./myDanceReducer";
// import persistReducer from 'redux-persist/es/persistReducer';
// import persistStore from 'redux-persist/es/persistStore';
// import thunk from "redux-thunk";


// const rootReducer = combineReducers({
//   auth: authReducer.reducer,
//   // myEmotion: myEmotionRuducer.reducer,
// })

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistdReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistdReducer,
//   middleware: [thunk],
// })

// export const persistor = persistStore(store);
// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import userSlice from "./userSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";


const reducers = combineReducers({
  user: userSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch;
