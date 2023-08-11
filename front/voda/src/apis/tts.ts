import { axiosGoogle } from "./server";

export const tts = async (requestData:object) => {
  const res = await axiosGoogle.post<any>(`?key=${process.env.REACT_APP_GOOGLE_API_KEY}` ,requestData)
  return res.data;
}