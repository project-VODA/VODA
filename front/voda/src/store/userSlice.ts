import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        accessToken: '',
        refreshToken: '',
        userInfo:{
            userEmail: '',
            userName: '',
            userHandicap: false,
            role: '',
        },
        isLogin: false,
    },
    reducers: {
        userSliceLogin:(state, action) =>{
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            // accessToken 복호화 및 유저 정보 저장
            let jwtPayload = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
            state.userInfo = {
                userEmail: jwtPayload.userEmail,
                userName: decodeURI(escape(jwtPayload.userName)),
                userHandicap: jwtPayload.userHandicap,
                role: jwtPayload.role,
            }
            state.isLogin = true;
        },
        userSliceAllocate: (state, action) => {
            state.accessToken = action.payload.accessToken;
            // accessToken 복호화 및 유저 정보 저장
            let jwtPayload = JSON.parse(atob(action.payload.accessToken.split('.')[1]));
            state.userInfo = {
                userEmail: jwtPayload.userEmail,
                userName: decodeURI(escape(jwtPayload.userName)),
                userHandicap: jwtPayload.userHandicap,
                role: jwtPayload.role,
            }
        },
        userSliceLogout:(state) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.userInfo = {
                userEmail: '',
                userName: '',
                userHandicap: false,
                role: '',
            };
            state.isLogin = false;
        }
    }
});

export default userSlice;
export const {userSliceLogin, userSliceLogout, userSliceAllocate} = userSlice.actions;

export interface UserInfoType{
    userEmail: string,
    userName: string,
    userHandicap: boolean,
    role: string,
}