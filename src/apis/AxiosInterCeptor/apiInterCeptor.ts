import axios from 'axios';
import { tokenUtils } from '../../store/AuthStore/tokenUtils';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('=== Request Interceptor ===');
    const token = tokenUtils.getAccessToken();
    console.log('Token from localStorage:', token ? `${token.substring(0, 10)}...` : 'null');
    console.log('Current headers:', config.headers);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Updated headers:', config.headers);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료로 인한 401 에러 && 재시도하지 않은 요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await tokenUtils.refreshTokens();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.log('Refresh error:', refreshError);
        tokenUtils.removeTokens();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 