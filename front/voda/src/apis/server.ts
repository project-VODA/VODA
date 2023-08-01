import axios from 'axios';
import { API_URL } from "../constants/url";

import store from '../store/store';

const accessToken = store.getState().auth.accessToken;

export const axiosServer = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer: ${accessToken}`,
  }
});

/*export const axiosServer = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer: ${accessToken}`,
  }
});*/
