import React from 'react';
import { useQuery } from 'react-query';
import { useProjectStore } from '../../store/ProjectStore/projectStore';
import { searchUsers } from '../../apis/userApi';
import { BiSearch, BiLoader } from 'react-icons/bi';

export default function SideModalSearchResult() {
  const {
    searchKeyword,
    isSearchResultOpen,
    addMember,
    toggleSearchResult,
    updatePeerName,
    selectedMembers,
  } = useProjectStore();

  const { data, isLoading, error } = useQuery(
    ['searchUsers', searchKeyword],
    () => searchUsers(searchKeyword),
    {
      enabled: !!searchKeyword && searchKeyword.length >= 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  );

  const users = Array.isArray(data?.datalist)
    ? data.datalist
    : data
    ? [data]
    : [];

  // 이미 선택된 멤버 필터링
  const filteredUsers = users.map((user) => ({
    ...user,
    isSelected: selectedMembers.some((member) => member.id === user.id),
  }));

  if (!searchKeyword || !isSearchResultOpen) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <BiLoader className="w-5 h-5 animate-spin text-blue-500" />
        </div>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              if (!user.isSelected) {
                addMember({
                  id: user.id,
                  name: user.name,
                  role: 'TM',
                  team: user.team,
                });
                toggleSearchResult();
                updatePeerName('');
              }
            }}
            className={`p-3 ${
              user.isSelected
                ? 'bg-gray-100 cursor-not-allowed'
                : 'hover:bg-gray-50 cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {user.name[0]}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.team || '소속 없음'}
                  </p>
                </div>
              </div>
              {user.isSelected && (
                <span className="text-sm text-blue-600">이미 추가됨</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
