import axios from 'axios';
import { API_URL } from "../constants/url";
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

/*export const axiosServer = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer: ${accessToken}`,
  }
});*/
