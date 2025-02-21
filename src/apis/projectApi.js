import api from './AxiosInterCeptor/apiInterCeptor.ts';

export const fetchProjects = async (userId) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API_DOMAIN}/api/projects/user/${userId}`,
      {
        withCredentials: true,
      },
    );
    console.log('Projects fetch response:', response);
    return response.data;
  } catch (error) {
    console.error('Projects fetch error:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API_DOMAIN}/api/projects`,
      projectData,
      {
        withCredentials: true,
      },
    );
    console.log('Project creation response:', response);
    return response.data;
  } catch (error) {
    console.error('Project creation error:', error);
    throw error;
  }
};
