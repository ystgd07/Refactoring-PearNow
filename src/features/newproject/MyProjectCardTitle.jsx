import React from 'react';
import { GiAlarmClock } from 'react-icons/gi';

export default function MyProjectCardTitle({ title, res }) {
  return (
    <div className="flex items-center w-2/5 mr-3 ">
      {new Date(res.start_date).getTime() < new Date().getTime() ? (
        <GiAlarmClock className="mr-2 text-emerald-600"></GiAlarmClock>
      ) : (
        <GiAlarmClock className="mr-2 text-black"></GiAlarmClock>
      )}
      <h1 className="text-lg font-bold truncate">{title}</h1>
    </div>
  );
}
