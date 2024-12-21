import React from 'react';
import UserMainCmp from './UserMainCmp';
import UserHeader from './UserHeader';
import UserStatusOfPjt from './UserStatusOfPjt';
import UserUpdateModal from './UserUpdateModal';
import { useUserMain } from '../../store/UserMain/store';

export default function User() {
  const { isOpenUpdateModal } = useUserMain((state) => state);
  return (
    <>
      <div className="w-full h-full p-10 overflow-y-auto bg-white border-2 shadow-md scrollBar scrollbar-thin scrollbar-thumb-amber-500">
        <UserHeader />
        <div className="flex mt-3">
          <div className="w-1/2 mr-4">
            <UserMainCmp />
          </div>
          <div className="w-1/2">
            <UserStatusOfPjt />
          </div>
        </div>
      </div>
      {isOpenUpdateModal && <UserUpdateModal />}
    </>
  );
}
