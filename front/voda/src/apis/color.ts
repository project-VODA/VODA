import { axiosFlask } from "./server";

export const getHello = async () => {
  const res = await axiosFlask.get<any>(`/hello`);
  return res.data;
}

export const getColor = async () => {
  const res = await axiosFlask.post<any>(`/color`);
  return res.data;
}