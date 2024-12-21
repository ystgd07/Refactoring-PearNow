import { create } from 'zustand';

// 모달 상태값
const initialPeerMain = {
  isOpenPeerModal: false,
  isOpenPeerModal2: false,
};

export const usePeerMain = create((set) => ({
  ...initialPeerMain,
  setIsOpenPeerModal: (isOpenPeerModal) =>
    set((state) => ({ isOpenPeerModal: !state.isOpenPeerModal })),
  setIsOpenPeerModal2: (isOpenPeerModal2) =>
    set((state) => ({ isOpenPeerModal2: !state.isOpenPeerModal2 })),
}));

// 내 피드백
const initialMyFeedback = {
  myFeedbackDto: [
    {
      avg: 0,
      comment1: '',
      comment2: '',
      no: 0,
      peer_id: '',
      project_no: 0,
      reg_date: '',
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      score5: 0,
      total: 0,
      user_id: '',
    },
  ],
};
export const useMyFeedback = create((set) => ({
  ...initialMyFeedback,
  setMyFeedbackComment1: (comment1) =>
    set((state) => ({ myFeedbackDto: { ...state.myFeedbackDto, comment1 } })),
  setMyFeedbackComment2: (comment2) =>
    set((state) => ({ myFeedbackDto: { ...state.myFeedbackDto, comment2 } })),
  setMyFeedbackData: (res) => set({ myFeedbackDto: res }),
}));

//
const initialPeerEv = {
  peerEvDto: {
    no: 0,
    user_id: '',
    avg: 0,
    best: '',
    peer_id: {},
  },
};

const initialPeerListOfProject = {
  peerList: [],
  pjtNoForPeer: '',
  pjtNo: '',
};

export const usePeerEv = create((set) => ({
  ...initialPeerEv,
  ...initialPeerListOfProject,

  setPeerEvNo: (p_no) =>
    set((state) => ({ peerEvDto: { ...state.peerEvDto, p_no } })),

  setUserId: (u_id) =>
    set((state) => ({ peerEvDto: { ...state.peerEvDto, u_id } })),

  setAvg: (avg) => set((state) => ({ peerEvDto: { ...state.peerEvDto, avg } })),

  setBest: (best) =>
    set((state) => ({ peerEvDto: { ...state.peerEvDto, best } })),

  setPjtNoForPeer: (data) =>
    set((state) => ({
      pjtNoForPeer: data,
    })),

  setPjtUserIdForPeer: (data) =>
    set((state) => ({
      pjtNo: data,
    })),

  setPeerId: (peerList) =>
    set((state) => ({
      peer_id: peerList,
    })),

  setPeerEvDto: (dto) => set((state) => ({ peerEvDto: dto })),
  setPeerList: (list) => set((state) => ({ peerList: list })),
}));

// 동료평가 리스트
const initialPeerList = {
  peerDatalistDto: [
    {
      no: 0,
      user_id: '',
      peer_id: '',
      peer_name: '',
      peer_image: '',
      peer_team: '',
      peer_role: '',
      score: 0, // 추가 : 동료 점수 0점일시 - 처리
    },
  ],
};

export const usePeerList = create((set) => ({
  ...initialPeerList,

  setPeerListNo: (no) =>
    set((state) => ({ peerDatalistDto: { ...state.peerDatalistDto, no } })),

  setPeerListUserId: (user_id) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, user_id },
    })),

  setPeerListPeerId: (peer_id) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, peer_id },
    })),

  setPeerListPeerName: (peer_name) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, peer_name },
    })),

  setPeerListPeerImage: (peer_image) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, peer_image },
    })),

  setPeerListPeerTeam: (peer_team) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, peer_team },
    })),

  setPeerListPeerRole: (peer_role) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, peer_role },
    })),

  setPeerListScore: (score) =>
    set((state) => ({
      peerDatalistDto: { ...state.peerDatalistDto, score },
    })),

  setPeerDatalistDto: (dto) => set((state) => ({ peerDatalistDto: dto })),
}));

export const useTogetherPeerEv = create((set) => ({
  togetherPeerDto: {
    score1: '',
    score2: '',
    score3: '',
    score4: '',
    score5: '',
    comment1: '',
    comment2: '',
  },
  selectPeerId: '',
  selectedName: '',
  selectedImg: '',

  setSelectedPeerId: (peerId) =>
    set((state) => ({
      selectPeerId: peerId,
    })),

  setSelectedName: (sName) =>
    set((state) => ({
      selectedName: sName,
    })),

  setSelectedImg: (img) =>
    set((state) => ({
      selectImg: img,
    })),

  setSelectedScore1: (selectedNum) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        score1: selectedNum,
      },
    })),

  setSelectedScore2: (selectedNum) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        score2: selectedNum,
      },
    })),
  setSelectedScore3: (selectedNum) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        score3: selectedNum,
      },
    })),
  setSelectedScore4: (selectedNum) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        score4: selectedNum,
      },
    })),
  setSelectedScore5: (selectedNum) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        score5: selectedNum,
      },
    })),
  setComment1: (comment_1) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        comment1: comment_1,
      },
    })),
  setComment2: (comment_2) =>
    set((state) => ({
      togetherPeerDto: {
        ...state.togetherPeerDto,
        comment2: comment_2,
      },
    })),
}));
