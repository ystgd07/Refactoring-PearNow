import React from 'react';
import { useUserMain } from '../../store/UserMain/store';
import UserUpdateBtn from './UserUpdateBtn';

export default function UserInput() {
  const { userMainData } = useUserMain((state) => state);
  return (
    <div className="p-5 ">
      <div className="mt-2 mb-3 text-xl font-bold text-slate-500">
        <p>이메일</p>
      </div>
      <div className="flex justify-between p-2 border-2 rounded-md border-slate-200">
        <p>{userMainData.mail}</p>
        <UserUpdateBtn state={'이메일'} />
      </div>
      <div className="mt-2 mb-3 text-xl font-bold text-slate-500">
        <p>전화번호</p>
      </div>
      <div className="flex justify-between p-2 border-2 rounded-md border-slate-200">
        <p>
          {!userMainData.phone ? '전화번호를 입력하세요.' : userMainData.phone}
        </p>
        <UserUpdateBtn state={'전화번호'} />
      </div>
      <div className="mt-2 mb-3 text-xl font-bold text-slate-500">
        <p>소속</p>
      </div>

      <div className="flex justify-between p-2 border-2 rounded-md border-slate-00">
        <p>{userMainData.team ? userMainData.team : '소속을 입력하세요.'}</p>
        <UserUpdateBtn state={'소속'} />
      </div>
    </div>
  );
}
