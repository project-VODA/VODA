import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
    name : 'callSlice',
    initialState : {
        //통화 요청후 서버로부터 전달 받는 객체
        sendResponse : {
            sessionToken: '',
            sessionId:'',
            callNo: 0,
        },
        receiveResponse : {
            receiveToken : '',
            callNo:0,
        },
    },
    reducers : {
        updateSendResponse:(state, action) => {
          state.sendResponse.sessionToken = action.payload.sessionToken;
          state.sendResponse.sessionId = action.payload.sessionId;
          state.sendResponse.callNo = action.payload.callNo;
        },
        updateReceiveResponse:(state, action) => {
            const { receiveToken, callNo } = action.payload;
            console.log(receiveToken, callNo);
            state.sendResponse.sessionToken = receiveToken;
            state.sendResponse.callNo = callNo;
        },
        initCall:(state) => {
            state.sendResponse.sessionToken ='';
            state.sendResponse.sessionId ='';
            state.sendResponse.callNo =0;
            state.receiveResponse.receiveToken='';
            state.receiveResponse.callNo=0;
        }
    }

});

export default callSlice;
export const { updateSendResponse, updateReceiveResponse, initCall } = callSlice.actions;

export interface SendResponseType {
    sessionToken : string,
    sessionId : string,
    callNo : number
};

export interface ReceiveResponseType {
    receiveToken : string,
    callNo : number
};