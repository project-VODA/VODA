import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
// import myDanceRuducer from "./myDanceReducer";
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  auth: authReducer.reducer,
  // myEmotion: myEmotionRuducer.reducer,
})

const persistConfig = {
  key: "root",
  storage,
};

const persistdReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistdReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;
