import { create } from 'zustand';

const initialCreatePjt = {
  pjtObj: {
    title: '',
    detail: '',
    peer_id: {},
    start_date: new Date(),
    end_date: new Date(),
  },
  pjtObjFake: [],
  noRequestPeerID: [],
  userList: [],
  selectedUser: {},
  isValidPjt1: false,
  isValidPjt2: false,
  isSearchResultOpen: false,
  peerName: '',
  page: 1,
};

const initialPjtModal = {
  pjtModal: false,
};

export const useOepnUpdateModal = create((set) => ({
  requestData: {},
  startDate: new Date(),
  endDate: new Date(),
  openUpdateModal: false,
  dateChangeValid: false,

  setRequestData: (requestData) => set((state) => ({ requestData })),

  setOpenUpdateModal: (openUpdateModal) =>
    set((state) => ({ openUpdateModal: !state.openUpdateModal })),

  setStartDate: (startDate) => set((state) => ({ startDate })),

  setEndDate: (endDate) => set((state) => ({ endDate })),

  setDateChangeValid: (dateChangeValid) =>
    set((state) => ({ dateChangeValid: state.startDate < state.endDate })),
}));

export const useHover = create((set) => ({
  hover: false,
  setHover: (hover) => set((state) => ({ hover: !state.hover })),
}));

export const useProjectModal = create((set) => ({
  pjtModal: false,
  pjtModalData: {
    no: 0,
    user_id: '',
    peer_id: {},
    title: '',
    detail: '',
    start_date: '',
    end_date: '',
    reg_date: '',
    mod_date: '',
  },
  projectNumber: '',
  projectUserId: '',
  setProjectNumber: (projectNumber) => set((state) => ({ projectNumber })),

  setProjectUserId: (projectUserId) =>
    set((state) => ({ projectUserId: projectUserId })),

  setPjtModal: (pjtModal) => set((state) => ({ pjtModal: !state.pjtModal })),

  setPjtModalData: (pjtModalData) =>
    set((state) => ({ pjtModalData: pjtModalData })),

  setPjtModalFalse: () => set({ pjtModal: false }),
}));

export const useOpenMainPage = create((set) => ({
  openMainPage: true,
  pjtObjInInitial: {
    title: '',
    detail: '',
    peer_id: {},
    start_date: new Date(),
    end_date: new Date(),
  },
  setPjtObjInInitial: (initialObj) =>
    set((state) => ({
      pjtObjInInitial: initialObj,
    })),

  setOpenMainPage: (openMainPage) =>
    set((state) => ({ openMainPage: !state.openMainPage })),
}));

export const useOpenMypage = create((set) => ({
  openMypage: false,
  setOpenMypage: (openMypage) =>
    set((state) => ({ openMypage: !state.openMypage })),
}));

export const useCreatePjtOne = create((set) => ({
  ...initialCreatePjt,
  setIsSearchResultOpen: (isSearchResultOpen) =>
    set((state) => ({ isSearchResultOpen: !state.isSearchResultOpen })),

  setPerrIdOfPjtObj: (peer_id) =>
    set((state) => ({
      pjtObj: {
        ...state.pjtObj,
        peer_id: {},
      },
    })),

  setSelectUser: (peer_id) =>
    set((state) => ({
      pjtObj: {
        ...state.pjtObj,
        peer_id: Object.assign(state.pjtObj.peer_id, { [peer_id]: 'TM' }),
      },
    })),

  setSelectUserRole: (peer_id, role) =>
    set((state) => ({
      pjtObj: {
        ...state.pjtObj,
        peer_id: Object.assign(state.pjtObj.peer_id, { [peer_id]: role }),
      },
    })),

  setNoRequestPeerID: (peer_id) =>
    set((state) => ({
      noRequestPeerID: [...new Set(state.noRequestPeerID.concat(peer_id))],
    })),

  setSelectUserRequestPeerID: (user) =>
    set((state) => ({
      selectedUser: Object.assign(state.selectedUser, { [user]: 'TM' }),
    })),

  setPjtTitle: (title) =>
    set((state) => ({ pjtObj: { ...state.pjtObj, title } })),

  setPjtDetail: (detail) =>
    set((state) => ({ pjtObj: { ...state.pjtObj, detail } })),

  setPjtStartDate: (start_date) =>
    set((state) => ({ pjtObj: { ...state.pjtObj, start_date } })),

  setPjtEndDate: (end_date) =>
    set((state) => ({ pjtObj: { ...state.pjtObj, end_date } })),

  setPjtObj: (DatapjtObj) => set((state) => ({ pjtObj: DatapjtObj })),

  setPeerName: (peerName) => set((state) => ({ peerName })),

  setIsValidPjt1: (pjtObj) =>
    set((state) => ({
      isValidPjt1:
        state.pjtObj.title.length > 0 &&
        state.pjtObj.detail.length > 0 &&
        state.pjtObj.start_date < state.pjtObj.end_date,
    })),

  setIsValidPjt2: (pjtObj) =>
    set((state) => ({
      isValidPjt2: state.noRequestPeerID.length > 0,
    })),

  setUserList: (userList) =>
    set((state) => ({
      userList,
    })),

  reset: () => {
    set(initialCreatePjt);
  },
  setNextPage: (page) => set((state) => ({ page: 2 })),
  setPrevPage: (page) => set((state) => ({ page: 1 })),
}));

export const useLoginAndCreateAccount = create((set) => ({
  loginObj: {
    id: '',
    pw: '',
  },
  createAccountObj: {
    id: '',
    pw: '',
    name: '',
  },
  checkPw: '',
  isValidLogin: false,
  isValidCreateAccount: false,
  setpwCheck: false,

  setLoginValid: (loginObj) =>
    set((state) => ({
      isValidLogin:
        state.loginObj.id.length > 0 && state.loginObj.pw.length > 0,
    })),

  setCreateAccountValid: (createAccountObj) =>
    set((state) => ({
      isValidCreateAccount:
        state.createAccountObj.id.length > 0 &&
        state.createAccountObj.pw.length > 0 &&
        state.createAccountObj.name.length > 0 &&
        state.createAccountObj.pw === state.checkPw,
    })),

  setId: (id) => set((state) => ({ loginObj: { ...state.loginObj, id } })),

  setpw: (pw) => set((state) => ({ loginObj: { ...state.loginObj, pw } })),

  setAccountId: (id) =>
    set((state) => ({ createAccountObj: { ...state.createAccountObj, id } })),

  setAccountpw: (pw) =>
    set((state) => ({
      createAccountObj: { ...state.createAccountObj, pw },
    })),

  setName: (name) =>
    set((state) => ({ createAccountObj: { ...state.createAccountObj, name } })),

  setCheckPw: (checkPw) => set((state) => ({ checkPw })),

  setCheckPwVaild: (checkPw) =>
    set((state) => ({
      setpwCheck: state.createAccountObj.pw === state.checkPw,
    })),
}));

// 백로그 이슈만들기 모달
export const useBackLogPage = create((set) => ({
  isBackLogModalOpen: false,
  setBackLogModalOpen: (isBackLogModalOpen) =>
    set((state) => ({ isBackLogModalOpen: !state.isBackLogModalOpen })),

  setBackLogModalOpenFalse: () => set({ isBackLogModalOpen: false }),
}));

// 백로그 상세페이지 모달
export const useBackLogDetailPage = create((set) => ({
  isBackLogModalOpen: false,
  setBackLogModalOpen: (isBackLogModalOpen) =>
    set((state) => ({ isBackLogModalOpen: !state.isBackLogModalOpen })),

  setBackLogModalOpenFalse: () => set({ isBackLogModalOpen: false }),
}));

// 로그아웃
