import { create } from 'zustand';
// /api/user/detail

const initialUserMain = {
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
    mod_date: new Date(),
  },
  userMainUpdateData: {
    name: '',
    mail: '',
    phone: '',
    team: '',
    image: '',
  },
  updateMail: '',
  updatePhone: '',
  updateTeam: '',
  isOpenDropdown: false,
  isOpenUpdateModal: false,
  modalState: '',
};

const initialProject = {
  projectDataList: [
    {
      user_id: '',
      owner_image: '',
      owner_id: '',
      owner_name: '',
      project_title: '',
      start_date: '',
      end_date: '',
      status: '',
    },
  ],
};

export const useProject = create((set) => ({
  ...initialProject,

  setProjectDataList: (projectDataList) =>
    set((state) => ({ projectDataList: projectDataList })),

  reset: () => set((state) => ({ ...initialProject })),
}));

export const useUserMain = create((set) => ({
  ...initialUserMain,
  headerUserImg: '',
  setUpdateDataOfUser: (updateDataOfUser) =>
    set((state) => ({ updateDataOfUser })),

  setUserMainUpdateData: (userMainUpdateData) =>
    set((state) => ({ userMainUpdateData: userMainUpdateData })),
  setModalState: (modalState) => set((state) => ({ modalState: modalState })),

  setIsOpenUpdateModal: (isOpenUpdateModal) =>
    set((state) => ({ isOpenUpdateModal: !state.isOpenUpdateModal })),

  setIsOpenDropdown: (isOpenDropdown) =>
    set((state) => ({ isOpenDropdown: !state.isOpenDropdown })),

  setUpdateMail: (updateMail) =>
    set((state) => ({
      updateMail: updateMail,
    })),

  setUpdatePhone: (updatePhone) =>
    set((state) => ({
      updatePhone: updatePhone,
    })),

  setUpdateTeam: (updateTeam) =>
    set((state) => ({
      updateTeam: updateTeam,
    })),

  setImageOfUser: (userImg) =>
    set((state) => ({
      headerUserImg: userImg,
    })),

  setUserMainData: (userMainData) =>
    set((state) => ({ userMainData: userMainData })),

  setUserMailOfMainData: (mail) =>
    set((state) => ({
      userMainData: {
        ...state.userMainData,
        mail: mail,
      },
    })),

  setUserPhoneOfMainData: (phone) =>
    set((state) => ({
      userMainData: {
        ...state.userMainData,
        phone: phone,
      },
    })),

  setUserTeamOfMainData: (team) =>
    set((state) => ({
      userMainData: {
        ...state.userMainData,
        team: team,
      },
    })),

  reset: () => set((state) => ({ ...initialUserMain })),
}));

export const useStatusUpdate = create((set) => ({
  statusUpdateData: {
    projectNumber: '',
    acceptStatus: '',
    declineStatus: '',
  },
  setUpdateAcceptStatus: (acceptStatus) =>
    set((state) => ({
      statusUpdateData: {
        ...state.statusUpdateData,
        acceptStatus: acceptStatus,
      },
    })),
  setUpdateDeclineStatus: (declineStatus) =>
    set((state) => ({
      statusUpdateData: {
        ...state.statusUpdateData,
        declineStatus: declineStatus,
      },
    })),
}));

export const useImage = create((set) => ({
  stateImageData: {
    userImg: '',
  },

  setUserImg: (imgFile) =>
    set((state) => ({
      stateImageData: {
        userImg: imgFile,
      },
    })),
}));

// 권한 받기
const initialMyRole = {
  myRoleDataList: {
    id: '',
    pw: null,
    name: null,
    mail: null,
    phone: null,
    team: null,
    image: null,
    grade: null,
    reg_date: null,
    mod_date: null,
    role: '',
    status: null,
    newaccesstoken: '',
  },
};

export const useMyRole = create((set) => ({
  ...initialMyRole,

  setMyRole: (data) => set((state) => ({ role: data })),
  setMyRoleDataList: (res) => set((state) => ({ myRoleDataList: res })),
}));
