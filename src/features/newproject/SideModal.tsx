import React from 'react';
import SideModalHeader from './SideModalHeader';
import SideModalMain from './SideModalMain';
import { useProjectStore } from '../../store/ProjectStore/projectStore';

interface SideModalProps {
  sideEvent?: () => void;
}

export default function SideModal() {
  const { isModalOpen, closeProjectModal } = useProjectStore();

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    closeProjectModal();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-white shadow-lg w-96 transform transition-transform duration-300 ease-in-out ${
        isModalOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="relative p-5">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="닫기"
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

        <SideModalHeader />
        <SideModalMain sideEvent={handleCloseModal} />
      </div>
    </div>
  );
}
