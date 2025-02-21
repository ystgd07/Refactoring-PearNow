import React from 'react';
import { BiBook } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

export default function PjtinfoDetail({ detail, members }) {
  // TM(팀장) 찾기
  const teamLeader = members?.find((member) => member.role === 'TM')?.user;

  return (
    <div className="divide-y mb-9">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BiBook className="mb-1 mr-2 text-xl" />
          <p className="text-lg font-thin text-slate-500">프로젝트 상세</p>
        </div>
      </div>

      {/* 프로젝트 리더 정보 */}
      {teamLeader && (
        <div className="py-4">
          <div className="flex items-center space-x-3 mb-3">
            <FaUserCircle className="text-xl text-gray-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {teamLeader.name}
              </p>
              <p className="text-xs text-gray-500">
                {teamLeader.team} · {teamLeader.grade}
              </p>
              <p className="text-xs text-gray-500">{teamLeader.mail}</p>
            </div>
            <span className="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
              프로젝트 리더
            </span>
          </div>
        </div>
      )}

      {/* 프로젝트 설명 */}
      <div className="py-4">
        <p className="text-sm text-gray-600 whitespace-pre-line">{detail}</p>
      </div>
    </div>
  );
}
