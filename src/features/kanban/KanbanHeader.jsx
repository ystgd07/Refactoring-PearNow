import React, { useState } from 'react';
import {
  AllThisSprints,
  useSelectedSprint,
} from '../../store/SprintStore/store';
import KanbanListOfSprint from './KanbanListOfSprint';
import { useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';

export default function KanbanHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { datalist, setDatalist } = AllThisSprints((state) => state);
  const navigate = useNavigate();

  const { selectedSprintTitle, selectedValidate, setSelectedValidate } =
    useSelectedSprint((state) => state);

  return (
    <div className="z-30 h-auto">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <div className="relative group">
          <div className="text-gray-500 ml-3">현재의 스프린트</div>
          <button
            id="dropdownDefaultButton"
            onClick={setSelectedValidate}
            className="inline-flex items-center mx-6 mt-1 text-3xl font-extrabold text-center bg-white rounded-lg text-slate-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
            type="button"
          >
            {/* 현재 스프린트 */}
            {selectedSprintTitle?.length === 0
              ? datalist[0]?.title
              : selectedSprintTitle}
            <svg
              className={`w-2.5 h-2.5 ml-2.5 transform ${
                isDropdownOpen ? 'rotate-180' : 'rotate-0'
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* 프로젝트 선택 드롭박스 */}
          {selectedValidate && (
            <div
              id="dropdown"
              className="absolute z-30 mx-16 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {datalist?.map((e, idx) => (
                  <KanbanListOfSprint key={idx} list={e} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className="flex flex-row-reverse items-center mr-3 text-gray-600"
          onClick={() => navigate(-1)}
        >
          <p className="p-1 mt-2 font-bold hover:scale-105">뒤로가기</p>
          <TiArrowBackOutline className="cursor-pointer w-7 h-7 hover:scale-125"></TiArrowBackOutline>
        </div>
      </div>
    </div>
  );
}
