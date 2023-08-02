import {axiosServer} from "./server";

// 회원가입 인증코드 이메일 발송
export const sendAuthenticationCode = async (email: string) => {
  const res = await axiosServer().post<any>(`/email/regist/`, email);
  return res.data;
}

export const sendTemporaryPassword = async (email: string) => {
  const res = await axiosServer().post<any>(`/email/pass/`, email);
  return res.data;
}