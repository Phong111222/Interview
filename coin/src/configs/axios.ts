import axios from 'axios';

import { HTTP_STATUS } from '../constants';

const axiosConfig = axios.create({
  baseURL: `https://api.coingecko.com/api/v3`,
});

axiosConfig.interceptors.request.use((config: any) => {
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error;
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZE: {
        return;
      }
      case HTTP_STATUS.SERVER_ERROR: {
        return Promise.reject({ message: 'Internal Server Error' });
      }
      default:
        break;
    }
  }
);

const { CancelToken } = axios;
const { isCancel } = axios;

export default axiosConfig;

export { isCancel, CancelToken };
