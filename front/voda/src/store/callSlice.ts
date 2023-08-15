import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
    name : 'callSlice',
    initialState : {
        //통화 요청후 서버로부터 전달 받는 객체
        callInfo: {
            sessionToken: '',
            sessionId: '',
            callNo: 0,
        },
        //통화상태 (통화중:true, 통화X:false)
        isRejectCall: false,
    },
    reducers : {
        updateCall: (state, action) => {
            state.callInfo.sessionToken = action.payload.sessionToken;
            state.callInfo.sessionId = action.payload.sessionId;
            state.callInfo.callNo = action.payload.callNo;
        },
        initCall:(state) => {
            state.callInfo.sessionToken = '';
            state.callInfo.sessionId = '';
            state.callInfo.callNo = 0;
        },
        setIsRejectCall: (state, action) => {
            state.isRejectCall = action.payload;
        },
    }

});

export default callSlice;
export const { updateCall, initCall, setIsRejectCall } = callSlice.actions;

export interface callInfoType {
    sessionToken : string,
    sessionId : string,
    callNo : number
};