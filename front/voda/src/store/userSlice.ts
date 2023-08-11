import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    userInfo: UserInfoType,
    userSetting: UserSettingType,
}

interface UserState extends LoginResponse{
    isLogin: boolean,
}

const initialState: UserState = {
    accessToken: '',
    refreshToken: '',
    userInfo:{
        userEmail: '',
        userName: '',
        role: '',
    },
    userSetting:{
        typeNo: 0,
        screenType: 0,
    },
    isLogin: false,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userSliceLogin:(state, action: PayloadAction<LoginResponse>) =>{
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userInfo = action.payload.userInfo;
            state.userSetting = action.payload.userSetting;
            state.isLogin = true;
        },
        userSliceLogout:(state) => {
            state = initialState;
        },
        updateAccessToken:(state, action: PayloadAction<{accessToken: string}>) => {
            state.accessToken = action.payload.accessToken;
        },
        updateUserName: (state, action: PayloadAction<string>) => {
            state.userInfo.userName = action.payload;
        },
        updateUserSetting: (state, action: PayloadAction<UserSettingType>) => {
            state.userSetting = action.payload;
        }
    }
});

export default userSlice;
export const {userSliceLogin, userSliceLogout, updateAccessToken, updateUserName, updateUserSetting} = userSlice.actions;

export interface UserInfoType{
    userEmail: string,
    userName: string,
    role: string,
};

export interface UserSettingType{
    typeNo: number,
    screenType: number,
};
