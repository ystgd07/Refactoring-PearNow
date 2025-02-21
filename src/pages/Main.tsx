import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  useProjectStore,
  ProjectData,
} from '../store/ProjectStore/projectStore';
import api from '../apis/AxiosInterCeptor/apiInterCeptor';
import Header from '../ui/Header';
import SideModal from '../features/newproject/SideModal';
import MyProjectCard from '../features/newproject/MyProjectCard';
import PjtInfo from '../features/newproject/PjtInfo';
import { HiPlus } from 'react-icons/hi';
import { BiLoader } from 'react-icons/bi';
import { useAuthStore } from '../store/AuthStore/authStore';

// EmptyProjectState 컴포넌트를 직접 구현
const EmptyProjectState = ({
  onCreateClick,
}: {
  onCreateClick: () => void;
}) => (
  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
    <div className="bg-gray-50 rounded-full p-6 mb-4">
      <HiPlus className="w-12 h-12 text-gray-400" />
    </div>
    <p className="text-gray-500 mb-4">아직 프로젝트가 없습니다</p>
    <button
      onClick={onCreateClick}
      className="inline-flex items-center px-6 py-3 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
    >
      첫 프로젝트 만들기
    </button>
  </div>
);

export default function Main() {
  const {
    projects,
    isLoading,
    error,
    setProjects,
    setError,
    isModalOpen,
    openProjectModal,
    closeProjectModal,
    isHover,
    selectedProject,
    setSelectedProject,
  } = useProjectStore();

  const { user } = useAuthStore(); // 인증된 사용자 정보 가져오기

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  // 프로젝트 목록 조회
  const { data: projectsData } = useQuery(
    ['projects', user?.id],
    async () => {
      if (!user?.id) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await api.get(`/api/projects/user/${user.id}`);
      return response.data;
    },
    {
      enabled: Boolean(user?.id),
      retry: 1,
      onSuccess: (data) => {
        const projectsWithMembers = Array.isArray(data)
          ? data.map((project) => ({
              ...project,
              members: project.members || [],
            }))
          : [];
        setProjects(projectsWithMembers);
      },
      onError: (error: Error) => {
        console.error('Error:', error);
        setError(error);
      },
    },
  );

  // 3. 로딩 상태 체크
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BiLoader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  // 4. 로그인 체크
  if (!user?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600">로그인이 필요합니다.</p>
        </div>
      </div>
    );
  }

  // 5. 에러 체크
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 max-w-lg">
          <h2 className="text-lg font-semibold text-red-700 mb-2">오류 발생</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // 새 프로젝트 버튼 클릭 핸들러
  const handleNewProject = () => {
    openProjectModal();
  };

  const handleProjectSelect = (project: ProjectData) => {
    setSelectedProjectId(selectedProjectId === project.no ? null : project.no);
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* 메인 컨텐츠 영역 */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* 헤더 영역 */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    내 프로젝트
                  </h1>
                  <p className="text-gray-500 mt-1">
                    총 {projects.length}개의 프로젝트
                  </p>
                </div>
                <button
                  onClick={handleNewProject}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 gap-2"
                >
                  <HiPlus className="w-5 h-5" />
                  <span>새 프로젝트</span>
                </button>
              </div>

              {/* 프로젝트 그리드 */}
              <div className="min-h-[calc(100vh-16rem)]">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <MyProjectCard
                        key={project.no}
                        res={project}
                        isError={false}
                        isSelected={selectedProjectId === project.no}
                        onClick={() => handleProjectSelect(project)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyProjectState onCreateClick={handleNewProject} />
                )}
              </div>
            </div>
          </div>

          {/* 사이드 패널 - 프로젝트 상세 정보 */}
          <div
            className={`w-[400px] transition-all duration-500 ease-in-out ${
              selectedProjectId
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            {selectedProject && (
              <div className="bg-white rounded-xl shadow-sm sticky top-4">
                <PjtInfo />
              </div>
            )}
          </div>
        </div>
      </main>

      <SideModal />
    </div>
  );
}
