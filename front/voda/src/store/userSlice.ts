import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistor } from "./store";

interface UserState {
    accessToken: string,
    refreshToken: string,
    userInfo: UserInfoType,
    userSetting: UserSettingType,
    isLogin: boolean,
}

interface TokenType {
    accessToken: string,
    refreshToken: string,
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
        userSliceLogin:(state, action: PayloadAction<TokenType>) =>{
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            // accessToken 복호화 및 유저 정보 저장
            let jwtPayload = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
            state.userInfo = {
                userEmail: jwtPayload.userEmail,
                userName: decodeURI(escape(jwtPayload.userName)),
                role: jwtPayload.role,
            };
            state.userSetting = {
                typeNo: jwtPayload.typeNo,
                screenType: jwtPayload.screenType,
            }
            state.isLogin = true;
        },
        userSliceAllocate: (state, action: PayloadAction<TokenType>) => {
            state.accessToken = action.payload.accessToken;
            // accessToken 복호화 및 유저 정보 저장
            let jwtPayload = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
            state.userInfo = {
                userEmail: jwtPayload.userEmail,
                userName: decodeURI(escape(jwtPayload.userName)),
                role: jwtPayload.role,
            };
            state.userSetting = {
                typeNo: jwtPayload.typeNo,
                screenType: jwtPayload.screenType,
            };
        },
        userSliceLogout:(state) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.userInfo = {
                userEmail: '',
                userName: '',
                role: '',
            };
            state.userSetting = {
                typeNo: 0,
                screenType: 0,
            };
            state.isLogin = false;
        },
        updateAccessToken:(state, action: PayloadAction<{accessToken: string}>) => {
            state.accessToken = action.payload.accessToken;
        }
    }
});

export default userSlice;
export const {userSliceLogin, userSliceAllocate, userSliceLogout, updateAccessToken} = userSlice.actions;

export interface UserInfoType{
    userEmail: string,
    userName: string,
    role: string,
};

export interface UserSettingType{
    typeNo: number,
    screenType: number,
};
