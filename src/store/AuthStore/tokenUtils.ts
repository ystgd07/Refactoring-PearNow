import { jwtDecode } from 'jwt-decode';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor';

interface TokenPayload {
  exp: number;
  userId: number;
}

export const tokenUtils = {
  setTokens: (accessToken: string, refreshToken: string) => {
    try {
      // 저장 전 토큰 유효성 검사
      if (!accessToken || !refreshToken) {
        console.error('Invalid tokens:', { accessToken, refreshToken });
        return;
      }

      // 저장 전 상태
      console.log('Before storage:', {
        existing_access: localStorage.getItem('accessToken'),
        existing_refresh: localStorage.getItem('refreshToken')
      });

      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 저장 후 확인
      console.log('After storage:', {
        saved_access: localStorage.getItem('accessToken'),
        saved_refresh: localStorage.getItem('refreshToken')
      });

      // API 인터셉터에 토큰 설정
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error('Error in setTokens:', error);
    }
  },

  getAccessToken: () => {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Getting access token:', token ? token.substring(0, 10) + '...' : 'null');
      return token;
    } catch (error) {
      console.error('Error in getAccessToken:', error);
      return null;
    }
  },

  getRefreshToken: () => {
    try {
      return localStorage.getItem('refreshToken');
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  removeTokens: () => {
    try {
      console.log('Removing tokens!!:', {
        access: localStorage.getItem('accessToken'),
        refresh: localStorage.getItem('refreshToken')
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error removing tokens:', error);
    }
  },

  isTokenExpired: (token: string): boolean => {
    if (!token) return true;
    
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },

  refreshTokens: async (): Promise<string | null> => {
    const refreshToken = tokenUtils.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await api.post('/api/auth/refresh', { refreshToken });
      const { accessToken, newRefreshToken } = response.data;
      
      tokenUtils.setTokens(accessToken, newRefreshToken);
      return accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      tokenUtils.removeTokens();
      return null;
    }
  },
};