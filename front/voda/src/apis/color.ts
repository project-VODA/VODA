import { axiosFlask } from "./server";

export const getHello = async () => {
  const res = await axiosFlask.get<any>(`/hello`);
  console.log('test hello: ', res);
  return res.data;
}

// export const getColor = async () => {
//   const res = await axiosFlask.get<any>(`/hello`);
//   console.log('test hello: ', res);
//   return res.data;
// }