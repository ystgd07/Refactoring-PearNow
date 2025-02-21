import React from 'react';
import { useProjectStore } from '../../store/ProjectStore/projectStore';
import { BiCalendar, BiUser } from 'react-icons/bi';

export default function PjtInfo() {
  const { selectedProject } = useProjectStore();

  if (!selectedProject) return null;

  // members가 undefined일 경우 빈 배열로 처리
  const members = selectedProject.members || [];

  return (
    <div className="p-6">
      {/* 프로젝트 제목 */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {selectedProject.title}
      </h2>

      {/* 프로젝트 상세 내용 */}
      <div className="mb-6">
        <p className="text-gray-600 whitespace-pre-wrap">
          {selectedProject.detail}
        </p>
      </div>

      {/* 프로젝트 기간 */}
      <div className="flex items-center text-gray-600 mb-4">
        <BiCalendar className="w-5 h-5 mr-2" />
        <span>
          {new Date(selectedProject.start_date).toLocaleDateString()} ~{' '}
          {new Date(selectedProject.end_date).toLocaleDateString()}
        </span>
      </div>

      {/* 프로젝트 멤버 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          프로젝트 멤버 ({members.length})
        </h3>
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center p-2 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600">{member.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">
                  {member.role === 'PM'
                    ? '프로젝트 관리자'
                    : member.role === 'TL'
                    ? '팀 리더'
                    : '팀원'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
