import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { TOKEY_KEY } from '../infrastructure/consts/local-storage-keys';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers.Authorization) {
      const token = window.localStorage.getItem(TOKEY_KEY)
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
