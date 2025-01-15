import { create } from 'zustand';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor';
import { toast } from 'react-hot-toast';

const initialUserState = {
  userMainData: {
    id: '',
    pw: '',
    name: '',
    mail: '',
    phone: '',
    team: '',
    image: '',
    grade: '',
    reg_date: new Date(),
    mod_date: null,
  },
  modalState: '',
  updateMail: '',
  updatePhone: '',
  updateTeam: '',
  isOpenUpdateModal: false,
  headerUserImg: '',
  isOpenDropdown: false,
};

export const useUserMain = create((set, get) => ({
  ...initialUserState,

  // 상태 업데이트 액션
  setUserMainData: (data) => set({ userMainData: data }),
  setModalState: (state) => set({ modalState: state }),
  setUpdateMail: (mail) => set({ updateMail: mail }),
  setUpdatePhone: (phone) => set({ updatePhone: phone }),
  setUpdateTeam: (team) => set({ updateTeam: team }),
  setIsOpenUpdateModal: () => set((state) => ({ isOpenUpdateModal: !state.isOpenUpdateModal })),
  setImageOfUser: (image) => set({ headerUserImg: image }),
  setIsOpenDropdown: () => set((state) => ({ isOpenDropdown: !state.isOpenDropdown })),

  // API 액션
  fetchUserData: async (userId) => {
    try {
      const response = await api.get(`/api/user/detail/${userId}`);
      set({ userMainData: response.data });
      return response.data;
    } catch (error) {
      toast.error('사용자 정보를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  updateUserData: async (data, userId) => {
    try {
      const response = await api.put(`/api/user/update/${userId}`, data);
      
      // 성공 시 상태 업데이트
      set((state) => ({
        userMainData: {
          ...state.userMainData,
          ...response.data
        }
      }));
      
      toast.success('정보가 성공적으로 업데이트되었습니다.');
      return response.data;
    } catch (error) {
      toast.error('정보 업데이트에 실패했습니다.');
      throw error;
    }
  },

  updateUserImage: async (file, userId, filename) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      const response = await api.put(`/api/user/image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      set((state) => ({
        userMainData: {
          ...state.userMainData,
          image: response.data.image
        }
      }));

      toast.success('프로필 이미지가 업데이트되었습니다.');
      return response.data;
    } catch (error) {
      toast.error('이미지 업로드에 실패했습니다.');
      throw error;
    }
  },

  // 상태 초기화
  resetUserState: () => {
    set(initialUserState);
  }
}));

// 이미지 관련 상태 관리
export const useImage = create((set) => ({
  stateImageData: {
    userImg: '',
  },
  setUserImg: (userImg) =>
    set((state) => ({
      stateImageData: {
        ...state.stateImageData,
        userImg,
      },
    })),
}));

// 프로젝트 관련 상태 관리
export const useProject = create((set) => ({
  projectDataList: [],
  setProjectDataList: (projectDataList) => set({ projectDataList }),
}));

// 역할 관련 상태 관리
export const useMyRole = create((set) => ({
  role: '',
  myRoleDataList: [],
  setMyRole: (role) => set({ role }),
  setMyRoleDataList: (myRoleDataList) => set({ myRoleDataList }),
}));

// 상태 업데이트 관련 store 추가
export const useStatusUpdate = create((set) => ({
  statusUpdateData: null,
  updateDeclineStatus: null,

  setStatusUpdateData: (data) => set({ statusUpdateData: data }),
  setUpdateDeclineStatus: (status) => set({ updateDeclineStatus: status }),

  // API 액션
  updateStatus: async (status, projectNumber, role) => {
    try {
      const response = await api.put(`/api/status/update`, {
        status,
        projectNumber,
        role
      });
      
      set({ statusUpdateData: response.data });
      return response.data;
    } catch (error) {
      toast.error('상태 업데이트에 실패했습니다.');
      throw error;
    }
  },

  declineStatus: async (projectNumber) => {
    try {
      const response = await api.put(`/api/status/decline`, {
        projectNumber
      });
      
      set({ updateDeclineStatus: response.data });
      return response.data;
    } catch (error) {
      toast.error('거절 처리에 실패했습니다.');
      throw error;
    }
  }
}));
