import { axiosServer } from "./server";

// 최근 통화 목록 가져오기
export const getRecentCallList = async () => {
  const res = await axiosServer().get<any>(`/calling/recentcall`);

  return res.data;
}