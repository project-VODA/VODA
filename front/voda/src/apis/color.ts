import { axiosFlask } from "./server";

export const getHello = async () => {
  const res = await axiosFlask.get<any>(`/hello`);
  return res.data;
}

export const colorRecognition = async (capturedImage:FormData) => {
  const res = await axiosFlask.post<any>(`/color`, capturedImage);
  console.log('test color: ', res);
  return res.data;
}

export const cosmeticRecognition = async (capturedImage:FormData) => {
  const res = await axiosFlask.post<any>(`/cosmetic`, capturedImage);
  console.log('test cosmetic: ', res);
  return res.data;
}