import React from 'react';
import { FaUsers, FaUserCircle } from 'react-icons/fa';

export default function PjtInfoMain({ members }) {
  // 모든 팀원 표시 (TM 포함)
  const allMembers = members || [];

  // 역할별 정렬 (TM이 가장 위에 오도록)
  const sortedMembers = [...allMembers].sort((a, b) => {
    if (a.role === 'TM') return -1;
    if (b.role === 'TM') return 1;
    return 0;
  });

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <FaUsers className="text-xl text-gray-500 mr-2" />
        <h3 className="text-lg font-thin text-slate-500">프로젝트 멤버</h3>
        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
          {allMembers.length}명
        </span>
      </div>

      <div className="space-y-3">
        {sortedMembers.map((member) => (
          <div
            key={member.user_id}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              member.role === 'TM'
                ? 'bg-amber-50 hover:bg-amber-100'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center flex-1">
              <FaUserCircle
                className={`text-xl mr-3 ${
                  member.role === 'TM' ? 'text-amber-500' : 'text-gray-400'
                }`}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">
                  {member.team || '팀 미지정'} · {member.grade || '직급 미지정'}
                </p>
                <p className="text-xs text-gray-500">
                  {member.mail || '이메일 미등록'}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                member.role === 'TM'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
              {member.role === 'TM' ? '팀장' : '팀원'}
            </span>
          </div>
        ))}

        {allMembers.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            아직 참여 중인 멤버가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
