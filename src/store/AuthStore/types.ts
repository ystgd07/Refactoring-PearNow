export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    id: string;
    pw: string;
  }
  
  export interface AuthResponse {
    user: User;
    tokenInfo: {
      accessToken: string;
      refreshToken: string;
    };
  }
  
  export interface SignUpCredentials extends LoginCredentials {
    name: string;
  }