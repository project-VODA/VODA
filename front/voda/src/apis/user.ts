import { resourceLimits } from "worker_threads";
import { SERVER_URL } from "../constants/url";
import { axiosInstance } from "./instance";

import {axiosServer} from "./server";

// 환경 설정 변경
export const updateUserSetting = async (userSetting: object) => {
  const res = await axiosServer().put<any>(`/settings`, userSetting);
  return res.data;
}

// 서버 DB 유저 회원가입
export const registServer = async (userData: object) => {
  const res = await axiosServer().post<any>(`/users/regist`, userData);
  return res.data;
}

// 서버 DB 유저 로그인
export const loginServer = async (userData: object) => {
  const res = await axiosServer().post<any>(`/users/login`, userData);
  return res.data;
};

// 로그아웃
export const logout = async () => {
  const res = await axiosServer().post<any>(`/users/logout`);
  return res.data;
};

// 서버 DB 유저 비밀번호 변경
export const changePassword = async (changePasswordData: object) => {
  const res = await axiosServer().post<any>(`/users/pass`, changePasswordData);
  return res.data;
}

// 서버 DB 유저 회원정보 조회
export const getUserInfo = async (userEmail: string) => {
  const res = await axiosServer().get<any>(`/users/mypage/${userEmail}`);
  return res.data;
}

// 서버 DB 유저 회원정보 수정
export const updateUserInfo = async (userData: object) => {
  const res = await axiosServer().put<any>(`/users/mypage`, userData);
  return res.data;
}

// 서버 DB 유저 회원탈퇴
export const cancelUser = async () => {
  const res = await axiosServer().delete<any>(`/users`);
  return res.data;
}

// 새로운 accessToken 발급
export const getAccessToken = async () => {
  const res = await axiosServer().get<any>('/users/token');
  return res.data;
}

/* -----------------------------------------------------------------------------------*/

// 카카오 로그인 리다이렉트
export const redirectKakao = () => {
  const CLIENT_ID = "573c93c75e5690082f119bc3a6f8215d";
  // const REDIRECT_URI = "http://localhost:3000/login/oauth2/kakao";
  const REDIRECT_URI = `${SERVER_URL}/login/oauth2/kakao`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
};

// 구글 로그인 리다이렉트
export const redirectGoogle = () => {
  const CLIENT_ID =
    "124626006679-cq05a5rj2anbrqtfcvv1bjtriqs2pjul.apps.googleusercontent.com";
  const REDIRECT_URI = `${SERVER_URL}/login/oauth2/google`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Foauth2%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
  window.location.href = GOOGLE_AUTH_URL;
};

// 카카오 로그인
export const loginKakao = async (code: string) => {
  const res = await axiosInstance.get<any>(`/user/login/kakao?code=${code}`);
  return res.data;
};

// 구글 로그인
export const loginGoogle = async (code: string) => {
  const res = await axiosInstance.get<any>(`/user/login/google?code=${code}`);
  return res.data;
};

// 탈퇴하기
export const withdraw = async () => {
  await axiosInstance.delete<any>(`/user`);
};

// accessToken 토큰 갱신
export const reissueToken = async () => {
  const res = await axiosInstance.post<any>(`/user/login/token`);
  return res.data;
};

// 회원 정보 받기
export const getUserDetail = async (userId?: number) => {
  const queryParam = userId !== undefined ? `?userId=${userId}` : "";
  const res = await axiosInstance.get(`/user/${queryParam}`);
  return res.data;
};

// 닉네임 중복 검사
export const checkNickname = async (nickname: string) => {
  const res = await axiosInstance.get(`/user/nickname/${nickname}`);
  return res.data;
};


// 유튜브 로그인 리다이렉트
export const redirectYoutube = () => {
  const CLIENT_ID =
    "124626006679-cq05a5rj2anbrqtfcvv1bjtriqs2pjul.apps.googleusercontent.com";
  const REDIRECT_URI = `${SERVER_URL}/upload`;
  const GOOGLE_Upload_URL = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/youtube.upload`;
  window.location.href = GOOGLE_Upload_URL;
};

