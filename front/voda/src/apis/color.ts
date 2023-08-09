import { axiosFlask } from "./server";

export const getHello = async () => {
  const res = await axiosFlask.get<any>(`/hello`);
  console.log('test hello: ', res);
  return res.data;
}

export const colorRecognition = async (capturedImage:FormData) => {
  const res = await axiosFlask.post<any>(`/color`, capturedImage);
  console.log('test color: ', res);
  return res.data;
}