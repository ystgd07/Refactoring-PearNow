import React from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useProjectModal, useOpenMainPage } from '../../store/store';

// 새 프로젝트 버튼
export const AddProjectButton = () => {
  const { setOpenMainPage } = useOpenMainPage((state) => state);
  const { setPjtModal } = useProjectModal((state) => state);

  const handleClick = () => {
    setOpenMainPage();
    setPjtModal();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      새 프로젝트
    </button>
  );
};

// + 버튼 컴포넌트
export const CircleAddButton = () => {
  const { setPjtModal, pjtModal } = useProjectModal((state) => state);
  const { setOpenMainPage } = useOpenMainPage((state) => state);

  const handleClick = () => {
    setPjtModal();
    setOpenMainPage();
  };

  return (
    <HiPlusCircle
      className="w-8 h-8 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
      onClick={handleClick}
      style={{
        transform: `${pjtModal ? 'rotate(45deg)' : 'rotate(0deg)'} `,
        transition: 'transform 0.2s ease-in-out',
      }}
    />
  );
};

// 기존 코드와의 호환성을 위해 CircleAddButton을 default export로 설정
export default CircleAddButton;
