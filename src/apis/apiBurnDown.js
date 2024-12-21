import axios from 'axios';

export async function fetchBurnDownData(sprint_no) {
  console.log('sprint_no', sprint_no);
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/kanban/burndown?sprint_no = ${sprint_no}`,
  );

  console.log('res', res);
  return res.data;
}

// 1번 그래프
export async function fetchAllBurndown(currentProjectNumber) {
  console.log('fetchAllBurndown', currentProjectNumber);
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/kanban/barburndown?project_no=${currentProjectNumber}`,
  );

  console.log('res', res);
  return res.data;
}

// 2번 그래프
export async function fetchOneBurndown(currentProjectNumber) {
  console.log('fetchOneBurndown', currentProjectNumber);
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/kanban/ptotal?project_no=${currentProjectNumber}`,
  );

  console.log('res', res);
  return res.data;
}

// 3번 그래프
export async function fetchSprintBurndown(sprintNo) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/kanban/burndown?sprint_no=${sprintNo}`,
  );

  console.log('res', res);
  return res.data;
}
