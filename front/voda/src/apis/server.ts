import axios from 'axios';
import { API_URL, FLASK_URL } from "../constants/url";
import store from '../store/store';

export const axiosServer = () => {
  let accessToken = store.getState().user.accessToken;

  return axios.create({
    baseURL: `${API_URL}`,
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    }
  })
};

// refreshToken을 authorization으로 하는 axios 요청
export const axiosServerWithRefresh = () => {
  let refreshToken = store.getState().user.refreshToken;

  return axios.create({
    baseURL: `${API_URL}`,
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${refreshToken}`,
    }
  });
}

// 
export const axiosFlask = axios.create({
  baseURL: `${FLASK_URL}`,
  withCredentials: false,
  headers: {
    "Content-type": "multipart/form-data",
  },
});