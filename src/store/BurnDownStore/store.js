import { create } from 'zustand';

const initialUseBurnDown = {
  burnDownObj: {
    no: 0,
    ori_no: 0,
    sprint_no: '5',
    lapse: 0,
    task: 0,
    done_job: '10',
    sub_day: 0,
    start_date: new Date(),
    end_date: new Date(),
    reg_date: new Date(),
    mod_date: new Date(),
  },
};

export const useBurnDown = create((set) => ({
  ...initialUseBurnDown,
  setBurnDownObj: (burnDownObj) =>
    set((state) => ({ burnDownObj: burnDownObj })),
}));

//
// 1. 스프린트 누적 그래프 - 44
const initialAllsprintBurndownDate = {
  allsprintBurndownDate: [
    {
      no: 0,
      ori_no: 0,
      sprint_no: 0,
      lapse: 0,
      task: 0,
      done_job: 0,
      sub_day: 0,
      start_date: new Date(),
      end_date: new Date(),
      reg_date: new Date(),
      mod_date: new Date(),
      total: 0,
      today: new Date(),
      title: '',
    },
  ],
};
export const allsprintBurndown = create((set) => ({
  ...initialAllsprintBurndownDate,

  setAllsprintBurndownDate: (allsprintBurndownDate) =>
    set((state) => ({ allsprintBurndownDate: allsprintBurndownDate })),
}));

// 2.- 43
const initialOneBurndownDate = {
  oneBurndownDate: [
    {
      no: 0,
      ori_no: 0,
      sprint_no: 0,
      lapse: 0,
      task: 0,
      done_job: 0,
      sub_day: 0,
      start_date: new Date(),
      end_date: new Date(),
      reg_date: new Date(),
      mod_date: new Date(),
      total: 0,
    },
  ],
};
export const oneBurndown = create((set) => ({
  ...initialOneBurndownDate,

  setOneBurndownDate: (oneBurndownDate) =>
    set((state) => ({ oneBurndownDate: oneBurndownDate })),
}));

// 3. -41
const initialsprintBurndownDate = {
  sprintBurndownDate: [
    {
      no: 0,
      ori_no: 0,
      sprint_no: 0,
      lapse: 0,
      task: 0,
      done_job: 0,
      sub_day: 0,
      start_date: new Date(),
      end_date: new Date(),
      reg_date: new Date(),
      mod_date: new Date(),
      total: 0,
      today: new Date(),
      title: '스프린트 예시 타이틀',
    },
  ],
};
export const sprintBurndown = create((set) => ({
  ...initialsprintBurndownDate,

  setSprintBurndownDate: (sprintBurndownDate) =>
    set((state) => ({ sprintBurndownDate: sprintBurndownDate })),
}));
