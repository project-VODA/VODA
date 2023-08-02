import { axiosServer } from "./server";

//통화 요청
export const sendCalling = async (callRequest:Object) => {
    const res = await axiosServer.post<any>(`/meetings/send`, callRequest);
    return res.data;
}

//통화 수락
export const receiveCalling = async (callReceiver:Object) => {
    const res = await axiosServer.post<any>(`/meetings/receive`, callReceiver);
    return res.data;
}

//통화 종료
export const offCalling = async (callOffRequst:Object) => {
    const res = await axiosServer.post<any>(`/meetings/quit`, callOffRequst);
    return res.data;
}
