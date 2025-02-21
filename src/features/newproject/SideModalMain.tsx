import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiSearch, BiX, BiCheck, BiCalendar } from 'react-icons/bi';
import SideModalSearchResult from './SideModalSearchResult';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor';
import { useLoginAndCreateAccount } from '../../store/store';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { useProjectStore } from '../../store/ProjectStore/projectStore';

interface SideModalMainProps {
  sideEvent?: () => void;
}

// searchResults의 타입 정의
interface SearchUser {
  id: string;
  name: string;
  team?: string | null;
  mail?: string | null;
}

const ROLE_OPTIONS = [
  { value: 'PM', label: '프로젝트 관리자' },
  { value: 'TL', label: '팀 리더' },
  { value: 'TM', label: '팀원' },
];

export default function SideModalMain({ sideEvent }: SideModalMainProps) {
  const {
    projectData,
    page,
    isValidStep1,
    isValidStep2,
    selectedMembers,
    updateTitle,
    updateDetail,
    updateDates,
    nextPage,
    prevPage,
    searchKeyword,
    updatePeerName,
    removeMember,
    isSearchResultOpen,
    updateSelectedMembers,
    toggleSearchResult,
  } = useProjectStore();

  // 로그인한 사용자 정보 가져오기
  const loggedInUserId = localStorage.getItem('userId');

  const queryClient = useQueryClient();

  // 프로젝트 생성 mutation
  const createProjectMutation = useMutation(
    async (projectData: any) => {
      const response = await api.post('/api/projects', projectData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        toast.success('프로젝트가 생성되었습니다');
        sideEvent?.(); // 모달 닫기
      },
      onError: (error) => {
        console.error('프로젝트 생성 실패:', error);
        toast.error('프로젝트 생성에 실패했습니다');
      },
    },
  );

  // searchResults를 배열로 초기화
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 컴포넌트 마운트 시 로그인한 사용자를 멤버로 자동 추가
  useEffect(() => {
    const addCurrentUser = async () => {
      try {
        const response = await api.get(`/api/user/detail/${loggedInUserId}`);
        const currentUser = response.data;

        // 현재 사용자를 PM 역할로 추가
        updateSelectedMembers([
          {
            id: currentUser.id,
            name: currentUser.name,
            role: 'PM', // 프로젝트 생성자는 PM으로 설정
          },
        ]);
      } catch (error) {
        console.error('현재 사용자 정보 조회 실패:', error);
      }
    };

    if (page === 2 && selectedMembers.length === 0) {
      addCurrentUser();
    }
  }, [page, loggedInUserId]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    updateDates({
      ...projectData,
      start_date: start ? start.toISOString() : null,
      end_date: end ? end.toISOString() : null,
    });
  };

  // 사용자 검색 함수 수정
  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await api.get(`/api/user/detail/${query}`);
      // 응답이 배열이 아닌 경우 배열로 변환하여 저장
      const userData = Array.isArray(response.data)
        ? response.data
        : response.data
        ? [response.data]
        : [];
      setSearchResults(userData);
    } catch (error) {
      console.error('사용자 검색 중 오류:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 검색어 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updatePeerName(value);
    toggleSearchResult();
    searchUsers(value);
  };

  const isValidTitle = projectData.title.length > 0;
  const isValidDetail = projectData.detail.length > 0;
  const isValidDate = projectData.start_date && projectData.end_date;

  const handleRoleChange = (userId: string, newRole: string) => {
    const updatedMembers = selectedMembers.map((member) =>
      member.id === userId ? { ...member, role: newRole } : member,
    );
    updateSelectedMembers(updatedMembers);
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        title: projectData.title,
        detail: projectData.detail,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        members: selectedMembers.map((member) => ({
          user_id: member.id,
          role: member.role || 'TM',
        })),
      };

      await createProjectMutation.mutateAsync(requestData);
    } catch (error) {
      console.error('프로젝트 생성 중 오류:', error);
      toast.error('프로젝트 생성에 실패했습니다');
    }
  };

  const handleRemoveUser = (userId: string) => {
    removeMember(userId);
  };

  return (
    <div className="space-y-6">
      {page === 1 ? (
        <>
          <div className="space-y-4">
            {/* 프로젝트 제목 입력 */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  프로젝트 제목
                </label>
                {projectData.title && (
                  <span
                    className={`text-xs ${
                      isValidTitle ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isValidTitle ? '입력 완료' : '필수 입력'}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => updateTitle(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                    ${
                      isValidTitle
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                  placeholder="프로젝트 제목을 입력하세요"
                />
                {projectData.title && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidTitle ? (
                      <BiCheck className="w-5 h-5 text-green-500" />
                    ) : (
                      <BiX className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 프로젝트 상세 내용 입력 */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  프로젝트 상세 내용
                </label>
                {projectData.detail && (
                  <span
                    className={`text-xs ${
                      isValidDetail ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isValidDetail ? '입력 완료' : '필수 입력'}
                  </span>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={projectData.detail}
                  onChange={(e) => updateDetail(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                    ${
                      isValidDetail
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                  placeholder="프로젝트 상세 내용을 입력하세요"
                  rows={4}
                />
              </div>
            </div>

            {/* 프로젝트 기간 선택 */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  프로젝트 기간
                </label>
                {(projectData.start_date || projectData.end_date) && (
                  <span
                    className={`text-xs ${
                      isValidDate ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isValidDate
                      ? '입력 완료'
                      : '시작일과 종료일을 모두 선택하세요'}
                  </span>
                )}
              </div>
              <div className="relative">
                <DatePicker
                  selectsRange
                  startDate={
                    projectData.start_date
                      ? new Date(projectData.start_date)
                      : null
                  }
                  endDate={
                    projectData.end_date ? new Date(projectData.end_date) : null
                  }
                  onChange={handleDateChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2
                    ${
                      isValidDate
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                  placeholderText="프로젝트 기간을 선택하세요"
                />
                <BiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* 입력 상태 표시 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              입력 상태
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <BiCheck
                  className={`w-5 h-5 ${
                    isValidTitle ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
                <span className="ml-2">프로젝트 제목</span>
              </div>
              <div className="flex items-center text-sm">
                <BiCheck
                  className={`w-5 h-5 ${
                    isValidDetail ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
                <span className="ml-2">프로젝트 상세 내용</span>
              </div>
              <div className="flex items-center text-sm">
                <BiCheck
                  className={`w-5 h-5 ${
                    isValidDate ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
                <span className="ml-2">프로젝트 기간</span>
              </div>
            </div>
          </div>

          {/* 다음 단계 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={nextPage}
              disabled={!isValidStep1}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                isValidStep1
                  ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              다음 단계
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 프로젝트 멤버 검색 */}
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프로젝트 멤버 추가
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => {
                    updatePeerName(e.target.value);
                    toggleSearchResult();
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="이름 또는 이메일로 검색"
                />
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {searchKeyword && (
                  <button
                    onClick={() => updatePeerName('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <BiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* 검색 결과 컴포넌트 */}
              <SideModalSearchResult />
            </div>

            {/* 선택된 멤버 목록 */}
            {selectedMembers.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  선택된 멤버 ({selectedMembers.length})
                </h3>
                <div className="flex flex-col gap-2">
                  {selectedMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        member.role === 'PM' ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600">
                            {member.name[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.name}
                          </p>
                          <select
                            value={member.role || 'TM'}
                            onChange={(e) =>
                              handleRoleChange(member.id, e.target.value)
                            }
                            disabled={member.role === 'PM'}
                            className={`mt-1 text-sm ${
                              member.role === 'PM'
                                ? 'text-blue-600 bg-blue-50 cursor-not-allowed'
                                : 'text-gray-600 bg-white cursor-pointer'
                            } border rounded px-2 py-1`}
                          >
                            {ROLE_OPTIONS.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                disabled={option.value === 'PM'}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {member.role !== 'PM' && (
                        <button
                          onClick={() => handleRemoveUser(member.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <BiX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 이전/완료 버튼 */}
          <div className="flex justify-between">
            <button
              onClick={prevPage}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              이전으로
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                selectedMembers.length === 0 || createProjectMutation.isLoading
              }
              className={`px-4 py-2 rounded-md ${
                selectedMembers.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {createProjectMutation.isLoading ? '생성 중...' : '완료'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
