import { format } from 'date-fns';
import React from 'react';
import { HiCalendar } from 'react-icons/hi';

export default function MyProjectCardFooter({ strDate, endDate }) {
  const today = new Date();
  const startDate = new Date(strDate);
  const end = new Date(endDate);

  // 프로젝트 상태 계산
  const getProjectStatus = () => {
    if (today < startDate)
      return { text: '시작 예정', color: 'text-blue-600 bg-blue-50' };
    if (today > end) return { text: '종료', color: 'text-gray-600 bg-gray-50' };
    return { text: '진행중', color: 'text-green-600 bg-green-50' };
  };

  const status = getProjectStatus();

  return (
    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <HiCalendar className="text-gray-400" />
        <span>{format(startDate, 'yyyy.MM.dd')}</span>
        <span>~</span>
        <span>{format(end, 'yyyy.MM.dd')}</span>
      </div>
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}
      >
        {status.text}
      </span>
    </div>
  );
}
