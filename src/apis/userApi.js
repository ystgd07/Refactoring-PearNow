import api from './AxiosInterCeptor/apiInterCeptor.ts';

export const searchUsers = async (searchTerm) => {
  try {
    const response = await api.get(`/api/user/detail/${searchTerm}`, {
      withCredentials: true,
    });
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('User search error:', error);
    throw error;
  }
};
