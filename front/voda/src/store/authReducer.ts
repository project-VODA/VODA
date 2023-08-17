import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "main",
  initialState: {
    isLogin: false,
    accessToken: "",
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
  },
});

export const {
  login,
  updateLoginStatus,
  updateAccessToken,
} = authReducer.actions;
export default authReducer;
