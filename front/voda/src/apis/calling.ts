import { axiosServer } from "./server";

// 최근 통화 목록 가져오기
export const getRecentCallList = async () => {
  const res = await axiosServer().post<any>(`/meetings/recentcall`);

  return res.data;
}

//통화 요청
export const sendCalling = async (callRequest:Object) => {
    const res = await axiosServer().post<any>(`/meetings/send`, callRequest);
    return res;
}

//통화 수락
export const receiveCalling = async (callReceiver:Object) => {
    const res = await axiosServer().post<any>(`/meetings/receive`, callReceiver);
    return res;
}

//통화 종료
export const offCalling = async (callOffRequst:Object) => {
    const res = await axiosServer().post<any>(`/meetings/quit`, callOffRequst);
    return res;
}

//통화 거절
export const rejectCalling = async (callNo:Number) => {
    const res = await axiosServer().get<any>(`/meetings/reject/${callNo}`);
    return res;
}
