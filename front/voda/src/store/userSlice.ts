import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "./store";

interface UserState {
    accessToken: string,
    refreshToken: string,
    userEmail: string,
    userInfo: UserInfoType,
    userSetting: UserSettingType,
    isLogin: boolean,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        accessToken: '',
        refreshToken: '',
        userEmail: '',
        userInfo:{
            userEmail: '',
            userName: '',
            userHandicap: '',
            role: '',
        },
        userSetting:{
            typeNo: 0,
            screenType: 0,
        },
        isLogin: false,
    
    },
    reducers: {
        userSliceLogin:(state, action) =>{
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            // accessToken 복호화 및 유저 정보 저장
            let jwtPayload = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
            state.userEmail = jwtPayload.userEmail;
            state.userInfo = {
                userEmail: jwtPayload.userEmail,
                userName: decodeURI(escape(jwtPayload.userName)),
                userHandicap: jwtPayload.userHandicap,
                role: jwtPayload.role,
            };
            state.userSetting = {
                typeNo: jwtPayload.typeNo,
                screenType: jwtPayload.screenType,
            }
            state.isLogin = true;
        },
        userSliceAllocate: (state, action) => {
            state.accessToken = action.payload.accessToken;
            // accessToken 복호화 및 유저 정보 저장
            let jwtPayload = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
            state.userEmail = jwtPayload.userEmail;
            state.userInfo = {
                userEmail: jwtPayload.userEmail,
                userName: decodeURI(escape(jwtPayload.userName)),
                userHandicap: jwtPayload.userHandicap,
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
            state.userEmail = '';
            state.userInfo = {
                userEmail: '',
                userName: '',
                userHandicap: '',
                role: '',
            };
            state.userSetting = {
                typeNo: 0,
                screenType: 0,
            };
            state.isLogin = false;
        },
        updateAccessToken:(state, action) => {
            state.accessToken = action.payload.accessToken;
        }
    }
});

export default userSlice;
export const {userSliceLogin, userSliceAllocate, userSliceLogout, updateAccessToken} = userSlice.actions;

export interface UserInfoType{
    userEmail: string,
    userName: string,
    userHandicap: string,
    role: string,
};

export interface UserSettingType{
    typeNo: number,
    screenType: number,
};
