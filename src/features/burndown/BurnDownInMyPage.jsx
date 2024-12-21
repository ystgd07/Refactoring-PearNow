import React from 'react';
import { Chart, Doughnut, Line } from 'react-chartjs-2';

export default function BurnDownInMyPage() {
  return (
    <div className="flex flex-row w-full h-full mb-7">
      <Line
        datasetIdKey="id"
        responsive={false}
        width={1}
        height={1}
        options={{ maintainAspectRatio: false }}
        data={{
          labels: [
            '2021-01-01',
            '2021-01-02',
            '2021-01-03',
            '2021-01-04',
            '2021-01-05',
            '2021-01-06',
            '2021-01-07',
          ],
          datasets: [
            {
              id: 1,
              label: '총 스프린트 작업',
              data: [12, 13, 15, 16, 19, 20, 21],
              backgroundColor: 'rgba(153,255,51,0.6)',
              fill: true,
              tension: 0.5,
            },
            {
              id: 2,
              label: '완료한 스프린트 작업',
              data: [5, 6, 7, 10, 4, 3, 1],
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 0.6)',
              fill: true,
              tension: 0.5,
            },
          ],
        }}
      />
      <div className="flex flex-col items-center justify-center w-full mb-6">
        <p className="flex items-center justify-center mb-2 mr-3 font-bold w-96">
          스프린트 진행률
        </p>
      </div>
    </div>
  );
}
