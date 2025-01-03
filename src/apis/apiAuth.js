import api from './AxiosInterCeptor/apiInterCeptor';
import { format } from 'date-fns';

// 로그인 API
export async function loginApi(form) {
  try {
    const response = await api.post('/api/auth/login', form);
    const { accessToken } = response.data.tokenInfo;
    
    // 토큰 저장
    localStorage.setItem('accessToken', accessToken);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// 회원가입 API
export async function registApi({ id, pw, name }) {
  try {
    const response = await api.post('/register', { id, pw, name });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// 로그아웃 API
export async function logoutApi() {
  try {
    await api.post('/api/auth/logout');
    localStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

// 프로젝트 업데이트 API
export const updateApi = async (projectNumber, data) => {
  try {
    const response = await api.put(`/api/project/change?projectNumber=${projectNumber}`, data);
    return response.data;
  } catch (error) {
    console.error('Project update error:', error);
    throw error;
  }
};

// 프로젝트 생성 API
export async function createProjectApi(pjtObj) {
  try {
    const formattedObj = {
      ...pjtObj,
      start_date: format(pjtObj.start_date, 'yyyy-MM-dd'),
      end_date: format(pjtObj.end_date, 'yyyy-MM-dd')
    };
    const response = await api.post('/api/project', formattedObj);
    return response.data;
  } catch (error) {
    console.error('Project creation error:', error);
    throw error;
  }
}

// 사용자 이미지 조회 API
export const getUserImg = async () => {
  try {
    const response = await api.get('/api/user/userimg');
    return response;
  } catch (error) {
    console.error('Get user image error:', error);
    throw error;
  }
};

// 권한 조회 API
export async function fetchMyRole(currentProjectNumber) {
  try {
    const response = await api.get(`/api/user/authority?project_no=${currentProjectNumber}`, {
      headers: { project_no: currentProjectNumber }
    });
    return response.data;
  } catch (error) {
    console.error('Fetch role error:', error);
    throw error;
  }
}

export default api;