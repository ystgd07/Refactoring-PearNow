import React from 'react';
import { GiAlarmClock } from 'react-icons/gi';

export default function MyProjectCardTitle({ title, res }) {
  const isActive = new Date(res.start_date).getTime() < new Date().getTime();

  return (
    <div className="flex items-center space-x-2">
      <GiAlarmClock
        className={`text-xl ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}
      />
      <h2 className="text-lg font-bold text-gray-800 truncate">{title}</h2>
    </div>
  );
}
