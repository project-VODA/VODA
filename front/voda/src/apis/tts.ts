import { axiosGoogle } from "./server";

const apiKey = 'AIzaSyC5prZmvmHmlj2gh_jqjOcFTLh1CLhOzxM';
export const colortts = async (requestData:object) => {
  const res = await axiosGoogle.post<any>(`?key=${apiKey}` ,requestData)
  return res.data;
}