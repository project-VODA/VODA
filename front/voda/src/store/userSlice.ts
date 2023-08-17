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
        usersettingTypeNo: 0,
        usersettingScreenType: 0,
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
            state.userInfo.userEmail = action.payload.userInfo.userEmail;
            state.userInfo.userName = action.payload.userInfo.userName;
            state.userInfo.role = action.payload.userInfo.role;
            state.userSetting.usersettingTypeNo = action.payload.userSetting.usersettingTypeNo;
            state.userSetting.usersettingScreenType = action.payload.userSetting.usersettingScreenType;
            state.isLogin = true;
        },
        userSliceLogout:(state) => {
            return initialState;
        },
        updateAccessToken:(state, action: PayloadAction<{accessToken: string}>) => {
            state.accessToken = action.payload.accessToken;
        },
        updateUserName: (state, action: PayloadAction<string>) => {
            state.userInfo.userName = action.payload;
        },
        updateSliceUserSetting: (state, action: PayloadAction<UserSettingType>) => {
            state.userSetting = action.payload;
        }
    }
});

export default userSlice;
export const {userSliceLogin, userSliceLogout, updateAccessToken, updateUserName, updateSliceUserSetting} = userSlice.actions;

export interface UserInfoType{
    userEmail: string,
    userName: string,
    role: string,
};

export interface UserSettingType{
    usersettingTypeNo: number,
    usersettingScreenType: number,
};
