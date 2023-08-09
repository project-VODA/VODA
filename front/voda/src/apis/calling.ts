import { axiosServer } from "./server";

// 최근 통화 목록 가져오기
export const getRecentCallList = async () => {
  const res = await axiosServer().post<any>(`/meetings/recentcall`);

  return res.data;
}

//통화 요청
export const sendCalling = async (callSendRequest:Object) => {
    const res = await axiosServer().post<any>(`/meetings/send`, callSendRequest);
    return res;
}

//통화 수락
export const receiveCalling = async (callNo:Number) => {
    const res = await axiosServer().get<any>(`/meetings/receive/${callNo}`);
    return res;
}

//통화 종료
export const offCalling = async (callNo:Number) => {
    const res = await axiosServer().get<any>(`/meetings/quit/${callNo}`);
    console.log("!!! 잘보내니?", callNo);
    return res;
}

//통화 거절
export const rejectCalling = async (callNo:Number) => {
    const res = await axiosServer().get<any>(`/meetings/reject/${callNo}`);
    return res;
}
