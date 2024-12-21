import React from 'react';
import { BiBook } from 'react-icons/bi';

export default function PjtinfoDetail({ detail }) {
  return (
    <div className="divide-y mb-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BiBook className="mb-1 mr-2 text-xl " />
          <p className="mt-2 mb-2 text-lg font-thin text-slate-500">
            프로젝트 상세
          </p>
        </div>
        <div className="flex flex-row-reverse font-bold text-blue-500 cursor-pointer hover:scale-110 hover:underline">
          수정
        </div>
      </div>
      <div className="flex items-center space-x-4 ">
        <p className="p-3">{detail}</p>
      </div>
    </div>
  );
}
