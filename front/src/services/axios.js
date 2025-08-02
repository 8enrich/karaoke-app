import axios from 'axios';
import { BACKEND_URL } from '../settings';
import { getToken } from './auth';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.auth = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
