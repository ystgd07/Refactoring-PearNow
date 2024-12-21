import React from 'react';

export default function UserStatusTitle() {
  return (
    <div className="flex justify-between px-5 py-2 border-b-2 border-black divide-x">
      <p className="text-xl font-bold">개설자</p>
      <p className="text-xl font-bold">프로젝트 이름</p>
      <div className="">
        <p className="text-xl font-bold">프로젝트 기간</p>
      </div>
      <p className="text-xl font-bold ">수락여부</p>
    </div>
  );
}
