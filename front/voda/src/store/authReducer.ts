import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "main",
  initialState: {
    isLogin: false,
    accessToken: "",
    // routeHistory: "",
    // openLoginModal: false,
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
      state.isLogin = true;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    // updateRouteHistory: (state, action: PayloadAction<string>) => {
    //   state.routeHistory = action.payload;
    // },
    // updateOpenLoginModal: (state, action: PayloadAction<boolean>) => {
    //   state.openLoginModal = action.payload;
    // },
  },
});

export const {
  login,
  updateLoginStatus,
  updateAccessToken,
  // updateRouteHistory,
  // updateOpenLoginModal,
} = authReducer.actions;
export default authReducer;
