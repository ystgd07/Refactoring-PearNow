import { ProjectData } from '../../store/ProjectStore/projectStore';

import React from 'react';
import MyProjectCardTitle from './MyProjectCardTitle';
import MyProjectCardFooter from './MyProjectCardFooter';
import { useProjectStore } from '../../store/ProjectStore/projectStore';
import MyProjectCardContent from './MyProjectCardContent';
import { BiError } from 'react-icons/bi';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor';

interface MyProjectCardProps {
  res: ProjectData;
  isError?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function MyProjectCard({
  res,
  isError,
  isSelected,
  onClick,
}: MyProjectCardProps) {
  const {
    setIsHover,
    setSelectedProject,
    setIsHoverFalse,
    isModalOpen,
    openProjectModal,
  } = useProjectStore();

  const handleMouseEnter = () => {
    if (!res.members) {
      api
        .get(`/api/projects/${res.no}/members`)
        .then((response) => {
          const projectWithMembers = {
            ...res,
            members: response.data,
          };
          setSelectedProject(projectWithMembers);
          setIsHover();
        })
        .catch((error) => {
          console.error('멤버 정보 로딩 실패:', error);
          setSelectedProject(res);
          setIsHover();
        });
    } else {
      setSelectedProject(res);
      setIsHover();
    }
  };

  const handleMouseLeave = () => {
    setIsHoverFalse();
  };

  if (isError) {
    return (
      <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-3 text-red-600">
          <BiError className="text-xl" />
          <div>
            <h3 className="font-medium">프로젝트 정보 로드 실패</h3>
            <p className="text-sm">프로젝트 정보를 불러오는데 실패했습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group p-6 bg-white border rounded-lg shadow-sm cursor-pointer 
        transition-all duration-300 hover:shadow-md
        ${
          isSelected
            ? 'border-blue-500 ring-1 ring-blue-500'
            : 'border-gray-200 hover:border-blue-300'
        }`}
      onClick={onClick}
    >
      <div className="flex flex-col space-y-4">
        <MyProjectCardTitle title={res.title} res={res} />
        <MyProjectCardContent content={res.detail} />
        <MyProjectCardFooter strDate={res.start_date} endDate={res.end_date} />
      </div>
    </div>
  );
}
