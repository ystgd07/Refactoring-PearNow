import { create } from 'zustand';

//
const initialProjectData = {
  pjtData: [
    {
      no: 1,
      user_id: '',
      title: '',
      detail: '',
      start_date: '',
      end_date: '',
      reg_date: '',
      mod_date: '',
    },
  ],
  pjtDetailData: [
    {
      id: '',
      name: '',
      mail: '',
      phone: '',
      team: '',
      image: '',
      grade: '',
      reg_date: null,
      mod_date: null,
    },
  ],
};
export const useProjectInBackLog = create((set) => ({
  ...initialProjectData,

  setPjtData: (res) => set((state) => ({ pjtData: res })),
  setPjtDetailData: (res) => set((state) => ({ pjtDetailData: res })),
}));

// [backlog : ModalDetail.jsx] 백로그 유저 서치
const initialUserBackLog = {
  searchUser: '',
  searchRes: [
    {
      id: 'btc11',
      pw: '',
      name: '양성수',
      mail: '',
      phone: '',
      team: '',
      image: '',
      grade: '',
      reg_date: '',
      mod_date: '',
    },
  ],
};

export const UseBackLog = create((set) => ({
  ...initialUserBackLog,
  // UseBackLog store의 searchRes 객체에 새로운 객체를 할당해 줌.
  setSearchRes: (Res) => set((state) => ({ searchRes: Res })),
  setSearchUser: (user) => set((state) => ({ searchUser: user })),
  reset: () => set((state) => ({ ...initialUserBackLog })),
}));

// [backlog : ModalDetail.jsx] 백로그 생성
const initialBackLog = {
  backlogDto: {
    user_id: '',
    title: '',
    detail: '',
    status: 'todo',
  },
  backFileDto: [
    //  {"name":"정해누기.png"}, {"name":"열.jpeg"}
  ],
};

export const createBackLog = create((set) => ({
  ...initialBackLog,
  // backlogDto
  setUserId: (user_id) =>
    set((state) => ({ backlogDto: { ...state.backlogDto, user_id } })),
  setTitle: (title) =>
    set((state) => ({ backlogDto: { ...state.backlogDto, title } })),
  setDetail: (detail) =>
    set((state) => ({ backlogDto: { ...state.backlogDto, detail } })),
  setStatus: (status) =>
    set((state) => ({ backlogDto: { ...state.backlogDto, status } })),
  // backFileDto
  addFileName: (name) =>
    set((state) => ({
      backFileDto: [name],
    })),
}));

// [mypage : BacklogIcon.jsx] 진행중인 백로그 아이콘
const initialBacklogIconForMypage = {
  success: true,
  code: 0,
  message: '',
  datalist: [
    {
      no: '',
      sprint_no: '',
      user_id: '',
      title: '',
      status: '',
    },
  ],
};

export const InProgressBacklogIconForMypage = create((set) => ({
  ...initialBacklogIconForMypage,
}));

// 프로젝트에 속한 전체 백로그 불러오기
const initialAllBacklog = {
  backlogData: [
    {
      no: 0,
      sprint_no: '',
      user_id: '',
      title: '',
      detail: '',
      image: '',
      status: '',
      reg_date: '',
      mod_date: '',
      image: '',
    },
  ],
};
export const AllBacklogOfThisPjt = create((set) => ({
  ...initialAllBacklog,

  setBacklogData: (res) => set((state) => ({ backlogData: res })),
}));

// 백로그 페이지 현재 번호
export const useBackLogPageRes = create((set) => ({
  currentProjectNumber: 0,
  currentProjectData: {},
  currentSearchUser: false,
  currentModifySearchUser: false,
  currentBackLogMananger: '',
  currentModiftBackLogMananger: '',
  currentBackLogImage: '',
  currentBackLogTeam: '',
  currentProjectOwner: '',

  setCurrentPjtNumber: (data) =>
    set((state) => ({ currentProjectNumber: data })),

  setCurrentPjtOwner: (data) => set((state) => ({ currentProjectOwner: data })),

  setCurrentSearcUser: (data) =>
    set((state) => ({ currentSearchUser: !state.currentSearchUser })),

  setCurrentModifySearchUser: (data) =>
    set((state) => ({
      currentModifySearchUser: !state.currentModifySearchUser,
    })),

  setCurrentModiftBackLogMananger: (data) =>
    set((state) => ({ currentModiftBackLogMananger: data })),

  setCurrentBackLogManager: (data) =>
    set((state) => ({ currentBackLogMananger: data })),

  setCurrentBackLogImage: (data) =>
    set((state) => ({ currentBackLogImage: data })),

  setCurrentBackLogTeam: (data) =>
    set((state) => ({ currentBackLogTeam: data })),
}));

// 프로젝트에 속한 전체 백로그 불러오기
const initialBacklogDetail = {
  backlogDetailData: [
    {
      no: 0,
      sprint_no: '',
      user_id: '',
      title: '',
      detail: '',
      image: '',
      status: '',
      reg_date: '',
      mod_date: '',
      image: '',
    },
  ],
};
export const BacklogDetailData = create((set) => ({
  ...initialBacklogDetail,

  setBacklogDetailData: (res) => set((state) => ({ backlogDetailData: res })),
}));

// 백로그 번호 상태
export const useBackNumStore = create((set) => ({
  backNum: '',
  selectedBackObj: {},

  setSelectedBackObj: (obj) => set({ selectedBackObj: obj }),
  setBackNum: (newBackNum) => set({ backNum: newBackNum }),

  setSelectedStatus: (inputStatus) =>
    set((state) => ({
      selectedBackObj: {
        status: inputStatus,
      },
    })),

  // setSelectedStatus: (status) =>
  //   set((state) => ({
  //     selectedBackObj: {
  //       status: status,
  //     },
  //   })),

  setSelectedTitle: (title) =>
    set((state) => ({
      selectedBackObj: {
        title: title,
      },
    })),
  setSelectedUserID: (user_id) =>
    set((state) => ({
      selectedBackObj: {
        user_id: user_id,
      },
    })),

  setSelectedDetail: (detail) =>
    set((state) => ({
      selectedBackObj: {
        detail: detail,
      },
    })),
}));
