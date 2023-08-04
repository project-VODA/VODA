import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "./store";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        accessToken: '',
        refreshToken: '',
        userInfo:{
            userEmail: '',
            userName: '',
            userHandicap: '',
            role: '',
        },
        userSetting:{
            typeNo: '',
            screenType: '',
        },
        call : {
            token: '',
            id:'',
            no: 0,
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
            state.userInfo = {
                userEmail: '',
                userName: '',
                userHandicap: '',
                role: '',
            };
            state.userSetting = {
                typeNo: '',
                screenType: '',
            };
            state.isLogin = false;
        },
				updateCallResponse:(state, action) => {
					state.call.token = action.payload.sessionToken;
          state.call.id = action.payload.sessionId;
          state.call.no = action.payload.callNo;

				},
    }
});

export default userSlice;
export const {userSliceLogin, userSliceAllocate, userSliceLogout, updateCallResponse} = userSlice.actions;

export interface UserInfoType{
    userEmail: string,
    userName: string,
    userHandicap: string,
    role: string,
}