import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

export default function PjtInfoMain({ workerList }) {
  console.log('dataList : ', workerList);
  return (
    <div className="divide-y">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <AiOutlineUser className="mr-2 text-xl" />
          <p className="mt-2 mb-1 text-lg font-thin text-slate-500">팀원</p>
        </div>
      </div>
      <li className="h-56 overflow-y-auto divide-y scrollbar-thumb-amber-400 scrollbar-thin">
        {workerList?.map((data, idx) => (
          <div className="flex items-center p-4 space-x-4">
            <div className="flex-shrink-0 ">
              <img
                className="w-8 h-8 rounded-full"
                // src="/img/je.jfif"
                src={`data:image/*;base64,${data?.image}`}
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 truncate dark:text-white">
                {data.team ? data.team : '무소속'}
              </p>
              <div className="flex items-center ">
                <p className="mr-2 text-sm font-bold text-black truncate dark:text-gray-400">
                  {data?.name}
                </p>
                <p className="text-xs font-semibold text-email">{data.mail}</p>
              </div>
            </div>
          </div>
        ))}
      </li>
    </div>
  );
}
