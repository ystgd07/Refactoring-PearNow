import { create } from 'zustand';
import { ProjectData } from './ProjectStore/projectStore';

interface PjtObj {
  title: string;
  detail: string;
  peer_id: Record<string, string>;
  start_date: Date;
  end_date: Date;
}

interface CreatePjtState {
  pjtObj: PjtObj;
  pjtObjFake: any[];
  noRequestPeerID: string[];
  userList: any[];
  selectedUser: Record<string, string>;
  isValidPjt1: boolean;
  isValidPjt2: boolean;
  isSearchResultOpen: boolean;
  peerName: string;
  page: number;
}

interface LoginObj {
  id: string;
  pw: string;
}

interface CreateAccountObj extends LoginObj {
  name: string;
}

interface LoginState {
  loginAndCreateAccount: boolean;
  loggedInUserId: string | null;
  setLoginAndCreateAccount: () => void;
}

export interface LoginAndCreateAccountState {
  loginObj: LoginObj;
  createAccountObj: CreateAccountObj;
  checkPw: string;
  isValidLogin: boolean;
  isValidCreateAccount: boolean;
  setpwCheck: boolean;
  setLoginValid: (loginObj: LoginObj) => void;
  setCreateAccountValid: (createAccountObj: CreateAccountObj) => void;
  setId: (id: string) => void;
  setpw: (pw: string) => void;
  setAccountId: (id: string) => void;
  setAccountpw: (pw: string) => void;
  setName: (name: string) => void;
  setCheckPw: (checkPw: string) => void;
  setCheckPwVaild: (checkPw: string) => void;
  loggedInUserId: string;
  setLoggedInUserId: (id: string) => void;
}

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

export const useLoginAndCreateAccount = create<LoginState>((set) => ({
  loginAndCreateAccount: false,
  loggedInUserId: null,
  setLoginAndCreateAccount: () =>
    set((state) => ({ loginAndCreateAccount: !state.loginAndCreateAccount })),
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

// 프로젝트 모달 관련
export const useProjectModal = create((set) => ({
  pjtModal: false,
  pjtModalData: null,
  pjtTitle: '',
  setPjtModal: () => set((state) => ({ pjtModal: !state.pjtModal })),
  setPjtModalFalse: () => set({ pjtModal: false }),
  setPjtModalData: (data) => set({ pjtModalData: data }),
  setPjtTitle: (title) => set({ pjtTitle: title }),
}));

// 메인 페이지 관련
export const useOpenMainPage = create((set) => ({
  openMainPage: false,
  setOpenMainPage: () =>
    set((state) => ({ openMainPage: !state.openMainPage })),
  setOpenMainPageFalse: () => set({ openMainPage: false }),
}));

// 마이페이지 관련
export const useOpenMypage = create((set) => ({
  openMypage: false,
  setOpenMypage: () => set((state) => ({ openMypage: !state.openMypage })),
}));

// 프로젝트 생성 관련
export const useCreatePjtOne = create((set) => ({
  // ... 기존 코드 유지
}));

// 호버 관련
export const useHover = create((set) => ({
  isHover: false,
  setIsHover: () => set({ isHover: true }),
  setIsHoverFalse: () => set({ isHover: false }),
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));

// 로그아웃
