import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        accessToken: '',
        refreshToken: '',
        user:{
            userEmail: '',
            userName: '',
            userHandiCap: '',
            role: '',
        },
        isLogin: false,
    },
    reducers: {
        login:(state, action) =>{
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            // accessToken 복호화 및 유저 정보 저장
            state.isLogin = true;
        },
        allocate: (state, action) => {
            state.accessToken = action.payload.accessToken;
            // accessToken 복호화 및 유저 정보 저장
        },
        logout:(state, action) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.user = {
                userEmail: '',
                userName: '',
                userHandiCap: '',
                role: '',
            };
            state.isLogin = false;
        }
    }
});

export default userSlice;
export const {login, allocate, logout} = userSlice.actions;