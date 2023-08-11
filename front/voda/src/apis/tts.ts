import { axiosGoogle } from "./server";

const apiKey = 'AIzaSyC5prZmvmHmlj2gh_jqjOcFTLh1CLhOzxM';
export const tts = async (requestData:object) => {
  const res = await axiosGoogle.post<any>(`${apiKey}` ,requestData)
  return res.data;
}