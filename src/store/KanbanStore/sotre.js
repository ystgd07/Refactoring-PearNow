import { create } from 'zustand';

// 칸반보드
const initialKanbanData = {
  datalist: [
    {
      no: null,
      sprint_no: null,
      user_id: '',
      title: '',
      detail: '',
      status: '',
      image: '',
      reg_date: '',
      mod_date: '',
    },
  ],
  columns: [],
};

export const useKanbanData = create((set) => ({
  ...initialKanbanData,

  setKanbanData: (res) => set((state) => ({ datalist: res })),
}));

export const useKanbanCloums = create((set) => ({
  colums: [],
  expecting: {
    status: '진행예정',
    color: 'bg-red-500',
    items: [],
  },
  processing: {
    status: '진행 중',
    color: 'bg-blue-500',
    items: [],
  },
  complete: {
    status: '완료',
    color: 'bg-green-500',
    items: [],
  },
  currentStatus: '',
  currentSelectedBackLogNo: 0,
  currentSelectedBackLogitem: '',
  currentSelectedUserImg: '',
  currentSelectedStatus: '',
  prevSelectedStatus: '',
  setColums: (data) =>
    set((state) => ({
      colums: new Array(state.expecting, state.processing, state.complete),
    })),
  setCurrentStatus: (data) => set((state) => ({ currentStatus: data })),
  setNewColums: (data) =>
    set((state) => ({
      colums: data,
    })),
  setCurrentSelectedBackLog: (data) =>
    set((state) => ({
      currentSelectedBackLogNo: data,
    })),
  setCurrentSelectedStatus: (data) =>
    set((state) => ({
      currentSelectedStatus: data,
    })),
  setPrevSelectedStatus: (data) =>
    set((state) => ({
      prevSelectedStatus: data,
    })),
  setCurrentSelectedImg: (data) =>
    set((state) => ({
      currentSelectedUserImg: data,
    })),

  setCurrentSelectedBackLogitem: (data) =>
    set((state) => ({
      currentSelectedBackLogitem: data,
    })),

  setProcessing: (data) =>
    set((state) => ({
      processing: {
        status: '진행 중',
        color: 'bg-[#CDECFA]',
        items: data?.filter((item) => item.status === 'ing'),
      },
    })),

  setExpecting: (data) =>
    set((state) => ({
      expecting: {
        status: '진행 예정',
        color: 'bg-[#FAC8C8]',
        items: data?.filter((item) => item.status === 'todo'),
      },
    })),

  setComplete: (data) =>
    set((state) => ({
      complete: {
        status: '완료',
        color: 'bg-[#C8FAC8]',
        items: data?.filter((item) => item.status === 'done'),
      },
    })),
}));
