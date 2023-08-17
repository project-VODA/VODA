import {axiosServer} from "./server";

// 친구 번호 찾기
export const findFriendNo = async (userEmail: string, friendEmail: string) => {
  const res = await axiosServer().get<any>(`/friends/find/${userEmail}/${friendEmail}`);
  return res.data;
}

// 친구 등록
export const registFriend = async (friend: object) => {
  const res = await axiosServer().post<any>(`/friends/regist`, friend);
  return res.data;
}

// 유저 검색
export const searchUser = async (userSearchRequest: object) => {
  const res = await axiosServer().post<any>(`/friends/search`, userSearchRequest);
  return res.data;
}

// 친구 목록
export const getFriendList = async (userEmail: string) => {
  const res = await axiosServer().get<any>(`/friends/${userEmail}`);
  return res.data;
}

// 친구 삭제
export const deleteFriend = async (friendNo: number) => {
  const res = await axiosServer().delete<any>(`/friends/${friendNo}`);
  return res.data;
}
