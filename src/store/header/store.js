import { create } from 'zustand';

// 현재 넘버 : 안씀?
export const PjtNumNow = create((set) => ({
  nowNum: 1,
  setNowNum: (project) => set({ nowNum: project }),
}));

// 토글 해더
export const toggleDropdown = create((set) => ({
  selectedDtopdownOfHeader: false,

  setSelectedDtopdownOfHeader: (data) =>
    set((state) => ({
      selectedDtopdownOfHeader: !state.selectedDtopdownOfHeader,
    })),
}));
