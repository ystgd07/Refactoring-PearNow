import React from 'react';
import UserInput from './UserInput';
import { HiInformationCircle } from 'react-icons/hi';

export default function UserMainCmp() {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-3">
        <HiInformationCircle className="mr-2 text-3xl" />
        <p className=" text-xl font-bold">본인 정보</p>
      </div>
      <div className="border-2 border-collapse border-slate-200 rounded-md shadow-lg bg-white h-2/5 w-full">
        <UserInput />
      </div>
    </div>
  );
}
