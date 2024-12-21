import React from 'react';
import { Link } from 'react-router-dom';
import { useOepnUpdateModal } from '../../store/store';
import { format } from 'date-fns';

export default function PjtinfoTitle({ startDate, endDate, title }) {
  const { openUpdateModal, setOpenUpdateModal, setStartDate, setEndDate } =
    useOepnUpdateModal((state) => state);
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
        {title}
      </p>
      <p
        className="text-sm font-medium text-blue-600 cursor-pointer hover:underline dark:text-blue-500"
        onClick={() => {
          setOpenUpdateModal();
          setStartDate(format(new Date(startDate), 'yyyy-MM-dd'));
          setEndDate(format(new Date(endDate), 'yyyy-MM-dd'));
        }}
      >
        날짜 수정
      </p>
    </div>
  );
}
