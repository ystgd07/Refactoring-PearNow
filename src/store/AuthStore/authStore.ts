import create from 'zustand';
import { AuthState, LoginCredentials, User, AuthResponse, SignUpCredentials } from './types';
import { tokenUtils } from './tokenUtils';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor';
import { toast } from 'react-hot-toast';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<boolean>;
  updateUser: (user: User) => void;
  register: (data: SignUpCredentials) => Promise<boolean>;
  initializing: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initializing: true,

  login: async (credentials: LoginCredentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post<AuthResponse>('/api/user/login', credentials);
      const { tokenInfo, user } = response.data;
      
      console.log('Saving tokens:', { 
        access: tokenInfo.accessToken.substring(0, 10) + '...', 
        refresh: tokenInfo.refreshToken.substring(0, 10) + '...' 
      });

      tokenUtils.setTokens(tokenInfo.accessToken, tokenInfo.refreshToken);
      
      const savedToken = tokenUtils.getAccessToken();
      console.log('Saved token verified:', !!savedToken);

      set({
        user,
        isAuthenticated: true,
        loading: false,
        error: null
      });

      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || '로그인에 실패했습니다.';
      set({
        error: errorMessage,
        loading: false,
        isAuthenticated: false,
        user: null
      });
      toast.error(errorMessage);
      return false;
    }
  },

  logout: async () => {
    try {
      const token = tokenUtils.getAccessToken();
      if (!token) {
        // 토큰이 없는 경우 로컬 로그아웃만 수행
        tokenUtils.removeTokens();
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
        toast.success('로그아웃되었습니다.');
        return;
      }

      // 토큰이 있는 경우 서버에 로그아웃 요청
      await api.post('/api/user/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      tokenUtils.removeTokens();
      set({
        user: null,
        isAuthenticated: false,
        error: null
      });
      toast.success('로그아웃되었습니다.');
    } catch (error) {
      console.error('Logout error:', error);
      // 에러가 발생해도 로컬 로그아웃은 수행
      tokenUtils.removeTokens();
      set({
        user: null,
        isAuthenticated: false,
        error: null
      });
      toast.success('로그아웃되었습니다.');
    }
  },

  initializeAuth: async () => {
    console.log('=== Auth Initialization Start ===');
    set({ initializing: true });
    
    try {
      const token = tokenUtils.getAccessToken();
      console.log('Step 1 - Token Check:', { 
        hasToken: !!token,
        tokenValue: token ? `${token.substring(0, 10)}...` : 'null'
      });

      if (!token) {
        console.log('Step 1 Failed: No token found');
        set({ 
          isAuthenticated: false, 
          user: null, 
          initializing: false,
          error: null
        });
        return false;
      }

      // 토큰 검증 API 호출
      try {
        console.log('Step 2 - Verifying Token');
        const token = tokenUtils.getAccessToken();
        console.log('Token for verification:', token ? `${token.substring(0, 10)}...` : 'null');
        
        const verifyResponse = await api.post('/api/auth/verify', null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Step 2 Success - Token verification response:', verifyResponse.data);
      } catch (error) {
        console.error('Step 2 Failed - Token verification failed:', error);
        tokenUtils.removeTokens();
        set({ 
          isAuthenticated: false, 
          user: null, 
          initializing: false,
          error: '인증이 만료되었습니다.'
        });
        return false;
      }

      // 사용자 정보 조회
      console.log('Step 3 - Fetching User Info');
      try {
        const response = await api.get<{ user: User }>('/api/auth/me');
        console.log('Step 3 Success - User Info:', {
          userId: response.data.user.id,
          headers: response.config.headers
        });

        set({ 
          user: response.data.user,
          isAuthenticated: true,
          error: null,
          initializing: false
        });
        console.log('=== Auth Initialization Complete: SUCCESS ===');
        return true;

      } catch (error: any) {
        console.error('Step 3 Failed - API Error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          headers: error.config?.headers
        });
        throw error;
      }

    } catch (error) {
      console.error('Auth initialization failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      tokenUtils.removeTokens();
      set({ 
        isAuthenticated: false, 
        user: null,
        error: '인증 초기화 중 오류가 발생했습니다.',
        initializing: false
      });
      return false;
    }
  },

  updateUser: (user: User) => {
    set({ user });
  },

  register: async (data: SignUpCredentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/register', data);
      
      if (response.data) {
        set({ loading: false, error: null });
        toast.success('회원가입이 완료되었습니다.');
        return true;
      }
      return false;
    } catch (error: any) {
      const errorMessage = error.response?.status === 409 
        ? '이미 존재하는 아이디입니다.'
        : '회원가입에 실패했습니다.';
      
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return false;
    }
  }
}));

export default useAuthStore;