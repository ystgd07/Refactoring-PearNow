import React from 'react';
import { Chart, Doughnut, Line, Bar } from 'react-chartjs-2';
import { BiLineChartDown, BiSolidPieChart } from 'react-icons/bi';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { addDays, eachDayOfInterval, format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { useQuery } from 'react-query';
import {
  allsprintBurndown,
  oneBurndown,
  sprintBurndown,
  useBurnDown,
} from '../store/BurnDownStore/store';
import {
  AllBacklogOfThisPjt,
  useBackLogPageRes,
  useProjectInBackLog,
} from '../store/BackLogStore/store';
import {
  fetchAllBurndown,
  fetchOneBurndown,
  fetchSprintBurndown,
} from '../apis/apiBurnDown';
import { AllThisSprints, useSelectedSprint } from '../store/SprintStore/store';
import Footer from '../ui/Footer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// 스프린트 진행률
export default function BurnDown() {
  const { burnDownObj, setBurnDownObj } = useBurnDown((state) => state);
  const { pjtData } = useProjectInBackLog((state) => state);
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { backlogData } = AllBacklogOfThisPjt((state) => state);
  const { sprintNo } = useSelectedSprint((state) => state);

  const { sprintBurndownDate, setSprintBurndownDate } = sprintBurndown(
    (state) => state,
  );
  // 1번 그래프
  const { allsprintBurndownDate, setAllsprintBurndownDate } = allsprintBurndown(
    (state) => state,
  );
  const { oneBurndownDate, setOneBurndownDate } = oneBurndown((state) => state);
  const { datalist } = AllThisSprints((state) => state);

  const { data: allBurndown, isLoading: allBurndownLoading } = useQuery(
    ['fetchAllBurndown'],
    () => fetchAllBurndown(pjtData[currentProjectNumber].no),
    {
      onSuccess: (data) => {
        console.log('fetchAllBurndown :', data);
        setAllsprintBurndownDate(data?.datalist);
      },
    },
  );

  // 2번 그래프
  const { data: oneBurndownUseQuery, isLoading: oneBurndownUseQueryLoading } =
    useQuery(
      ['fetchOneBurndown'],
      () => fetchOneBurndown(pjtData[currentProjectNumber].no),
      {
        enabled: !!allBurndown,
        onSuccess: (data) => {
          console.log('fetchOneBurndown :', data);
          setOneBurndownDate(data?.data);
        },
      },
    );

  const navigate = useNavigate();
  const donutData = {
    labels: ['완료', '전체', '미완료'],
    datasets: [
      {
        data: [
          oneBurndownDate?.done_job,
          oneBurndownDate?.total,
          oneBurndownDate?.task,
        ],
        backgroundColor: ['#c5f2ba', '#ffeb9b', '#b5f2ff'],
        borderColor: ['#c5f2ba', '#ffeb9b', '#b5f2ff'],
      },
    ],
  };

  // 3번 그래프
  //바보같은 나 : 스프린트 번호 구하기 대작전 ...
  //-> datalist.no
  console.log('스프린트 번호를 구해야합니다요 :', datalist);
  const SprintNoForBurndown = datalist?.map((data) => data?.no); // 현재 프로젝트의 스프린트 번호 구하기
  console.log('스프린트 번호를 구했을껄용? :', SprintNoForBurndown); // 스프린트 번호를 구했을껄용? : (8) [1, 2, 3, 4, 5, 96, 97, 98]
  console.log('sprintNoin', sprintNo);

  const { data: sprintBurndownUseQuery, isLoading: sprintBurndownLoading } =
    useQuery(
      ['fetchSprintBurndown'],
      () =>
        Promise.all(SprintNoForBurndown?.map((no) => fetchSprintBurndown(no))),
      {
        onSuccess: (data) => {
          console.log('fetchSprintBurndown :', data);
          setSprintBurndownDate(data?.flat());
        },
      },
    );

  console.log('sprintBurndownDate입니동 : ', sprintBurndownDate);
  // 오늘 날짜
  const newDate = new Date();
  const today = format(newDate, 'yyyy-MM-dd');
  // 스프린트의 날짜구하기 sprintBurndownDate?.start_date
  // const start_date = new Date();
  // const end_date = new Date();
  // const allDates = new Date();
  // const sprintDate = new Date();
  // const formattedSprintDates = sprintBurndownDate.map((sprint) => {
  //   start_date = new Date(sprint?.start_date);
  //   end_date = new Date(sprint?.end_date);
  //   allDates = eachDayOfInterval({ start: start_date, end: end_date });
  // });
  // sprintDate = allDates.map((date) => format(date, 'yyyy-MM-dd'));
  // console.log('allDates', allDates);

  // ---------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  // arr
  const arr = sprintBurndownDate?.map((e, idx) => e.datalist);
  const filterArr = arr?.filter((e, idx) => e !== null);

  console.log('arrarr: ', filterArr, sprintBurndownDate);
  // ---------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  // filterArr?.map((e, idx) => {
  //   console.log('fiterArrTitle', e[0].title);
  // });

  // totalData & totalDataLength
  const totalData = filterArr?.map((data) => data?.total) || [];
  const totalDataLength = totalData.length;
  console.log('totalDataLength', totalDataLength);
  for (let i = Math.max(0, totalData.length - 1); i >= 0; i--) {
    totalData[i] = 0;
  }
  // for (let i = Math.max(0, totalData.length - 1); i >= totalDataLength; i--) {
  //   totalData[i] = 0;
  // }

  return (
    <>
      <div className="w-[98%]">
        <div className="p-4 h-[742zpx] scroll overflow-y-scroll rounded-lg m-1 my-3 bg-white scrollBar">
          <div className="ml-10 ">
            <div
              className="flex flex-row-reverse items-center mr-3 text-gray-600"
              onClick={() => navigate(-1)}
            >
              <p className="p-1 mt-2 font-bold hover:scale-105">뒤로가기</p>
              <TiArrowBackOutline className="cursor-pointer w-7 h-7 hover:scale-125"></TiArrowBackOutline>
            </div>
            {/*  1. 최근 일주일 치 번다운 차트 - 오늘 날짜 기준 */}
            <div className="flex flex-row items-center mt-2 mb-3 text-xl font-bold">
              <BiLineChartDown className="text-4xl text-slate-600"></BiLineChartDown>
              <p className="ml-3 text-2xl text-gray-800">총 스프린트 진행률</p>
            </div>
            <div className="text-sm text-gray-400 my-1">
              🕒 최근 업데이트 일 : {today}일 기준
            </div>
            <div className="flex flex-row w-3/5 h-96 mb-7">
              <Bar
                datasetIdKey="id"
                responsive={false}
                width={400}
                height={300}
                data={{
                  // allsprintBurndownDate?.map((data) => (data.title))
                  labels: allsprintBurndownDate?.map((data) => data?.title),

                  datasets: [
                    {
                      id: 1,
                      fill: true,
                      label: '완료된 백로그',
                      data: allsprintBurndownDate?.map((data) => data.done_job),
                      backgroundColor: '#c5f2ba',
                      borderColor: '#c5f2ba',
                      tension: 0.5,
                    },
                    {
                      id: 2,
                      label: '총 백로그',
                      data: allsprintBurndownDate?.map((data) => data.total),
                      backgroundColor: '#ffeb9b',
                      borderColor: '#ffeb9b',
                      tension: 0.5,
                    },
                  ],
                }}
                options={{
                  // maintainAspectRatio: false,
                  maintainAspectRatio: true,
                  scales: {
                    x: {
                      stacked: true,
                      // stacked: false,
                    },
                    y: {
                      // stacked: true,
                      stacked: false,
                    },
                  },
                }}
              />

              {/* 2. 스프린트 진행률 : 원형 그래프 */}
              <div className="flex flex-col items-center justify-center w-full mb-6 ml-10 mr-6">
                <p className="flex items-center justify-center mr-3 font-bold w-96 text-2xl text-gray-800 m-2">
                  <BiSolidPieChart className="mr-3 text-2xl" />총 백로그 진행률
                </p>
                <Doughnut data={donutData}></Doughnut>
              </div>
            </div>
          </div>
          {/* 3. 날짜에 맞는 백로그 갯수 fetchOneBurndown*/}
          <div className="ml-10 pt-3">
            <div className="mt-3 mb-3 font-bold text-2xl text-gray-800 ml-3">
              <p>스프린트별 번다운 차트</p>
            </div>
            {/* <div className="grid w-full grid-cols-4 overflow-y-scroll gap-x-3 gap-y-5 scrollBar"> */}
            <div className="flex w-full overflow-x-scroll gap-x-3 gap-y-5 h-96 scrollbar-thin scrollBar">
              {filterArr?.map((e, idx) => (
                <>
                  <div className="w-full h-80">
                    <Line
                      className="mb-3"
                      key={idx}
                      datasetIdKey="id"
                      responsive={false}
                      width={1}
                      height={1}
                      options={{
                        maintainAspectRatio: false,
                      }}
                      data={{
                        labels: e?.map((data) => data?.today), //각 투데이
                        datasets: [
                          // {
                          //   id: 1,
                          //   label: '총 백로그',
                          //   data: e?.map((data) => data?.total), // 총 백로그 데이터
                          //   backgroundColor: 'rgba(153,255,51,0.6)',
                          //   borderColor: '#ececec',
                          //   fill: true,
                          //   tension: 0.5,
                          // },
                          {
                            id: 1,
                            label: '총 백로그',
                            data: e?.map((data) => data?.total),
                            // data: [20, 18, 15, 12, 9, 6, 0],
                            backgroundColor: 'rgba(153,255,51,0.6)',
                            borderColor: '#ececec',
                            fill: true,
                            tension: 0.5,
                          },
                          {
                            id: 2,
                            label: '완료한 백로그',
                            data: e?.map((data) => data?.task), // task
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 0.6)',
                            fill: true,
                            tension: 0.5,
                          },
                        ],
                      }}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
