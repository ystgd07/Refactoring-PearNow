import React from 'react';
import PjtinfoTitle from './PjtinfoTitle';
import PjtInfoMain from './PjtInfoMain';
import { useHover, useProjectModal } from '../../store/store';
import PjtinfoDetail from './PjtinfoDetail';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Facebook } from 'react-content-loader';
import toast from 'react-hot-toast';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor.ts';
import { BiError } from 'react-icons/bi';

export default function PjtInfo() {
  const { isHover, selectedProject, setIsHoverFalse } = useHover(
    (state) => state,
  );

  // 프로젝트 상세 정보를 가져오는 쿼리
  const {
    data: projectDetail,
    isLoading: isProjectLoading,
    error,
  } = useQuery(
    ['projectDetail', selectedProject?.no],
    async () => {
      const res = await api.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/projects/${selectedProject.no}`,
        { withCredentials: true },
      );
      return res.data;
    },
    {
      enabled: !!selectedProject?.no,
      onSuccess: () => {
        toast.success('프로젝트 정보를 불러왔습니다.');
      },
      onError: (error) => {
        console.error('프로젝트 정보 로딩 실패:', error);
        toast.error('프로젝트 정보를 불러오지 못했습니다.');
      },
    },
  );

  // 닫기 버튼 핸들러 추가
  const handleClose = () => {
    setIsHoverFalse();
  };

  if (!isHover || !selectedProject) {
    return (
      <div className="p-6 text-center text-gray-500">
        프로젝트를 선택하면 상세 정보가 표시됩니다
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 text-red-600">
            <BiError className="text-2xl" />
            <div>
              <h3 className="font-medium">프로젝트 상세 정보 로드 실패</h3>
              <p className="text-sm">
                {error.response?.data?.message ||
                  '프로젝트 정보를 불러오는데 실패했습니다.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProjectLoading || !projectDetail || !projectDetail.title) {
    return (
      <div className="p-6">
        <Facebook />
      </div>
    );
  }

  return (
    <div className="p-6 relative">
      {/* 닫기 버튼 추가 */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <PjtinfoTitle
        startDate={projectDetail.start_date}
        endDate={projectDetail.end_date}
        title={projectDetail.title}
      />
      <div className="flow-root">
        <ul role="list" className="divide-gray-200">
          <PjtinfoDetail
            detail={projectDetail.detail}
            members={projectDetail.members}
          />
          <PjtInfoMain members={projectDetail.members} />
        </ul>
      </div>
    </div>
  );
}
