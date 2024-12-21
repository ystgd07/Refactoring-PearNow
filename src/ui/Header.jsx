import React from 'react';
import ProjectList from '../features/header/ProjectList';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../store/BackLogStore/store';
import { toggleDropdown } from '../store/header/store';
import { fetchMyRole } from '../apis/apiAuth';
import { useMyRole } from '../store/UserMain/store';
import { useQuery } from 'react-query';

export default function Header() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pjtData } = useProjectInBackLog((state) => state);
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { selectedDtopdownOfHeader, setSelectedDtopdownOfHeader } =
    toggleDropdown((state) => state);

  console.log('currentProjectNumber  :', currentProjectNumber);

  // 권한 받기
  const { setMyRole, setMyRoleDataList, myRoleDataList, role } = useMyRole(
    (state) => state,
  );
  const { data: myRoleData, isLoading: yRoleDataLoading } = useQuery(
    ['fetchMyRole', pjtData[currentProjectNumber].no],
    () => fetchMyRole(pjtData[currentProjectNumber].no),
    {
      onSuccess: (data) => {
        console.log('fetchMyRole11 :', data);
        console.log('fetchMyRole22 :', data?.data);
        setMyRoleDataList(data?.data);
        setMyRole(data?.data?.role);
      },
    },
  );

  return (
    <header className="z-50 bg-white w-[98%] rounded-md m-1 my-2">
      <div>
        <div className="container flex items-center justify-start py-2 mx-auto">
          <div className="relative group">
            <div className="mx-10 text-gray-500">프로젝트명</div>
            <button
              id="dropdownDefaultButton"
              onClick={setSelectedDtopdownOfHeader}
              className="inline-flex items-center mx-16 text-2xl font-extrabold text-center text-gray-800 bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <p className="text-3xl mt-1">
                {currentProjectNumber === 1
                  ? pjtData[1]?.title
                  : currentProjectNumber === 0
                  ? pjtData[0]?.title
                  : pjtData[currentProjectNumber]?.title}
              </p>
              <svg
                className={`w-2.5 h-2.5 ml-2.5 transform ${
                  selectedDtopdownOfHeader ? 'rotate-180' : 'rotate-0'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* 프로젝트 선택 드롭박스 */}
            {selectedDtopdownOfHeader && (
              <div
                id="dropdown"
                className="z-50 absolute mx-16 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 duration-1000 overflow-y-scroll scrollBar h-44"
              >
                <ul
                  className="py-2 text-base text-gray-800 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {pjtData?.map((e, idx) => (
                    <ProjectList key={idx} pjt={e} index={idx} />
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* 프로젝트 수정 */}
          <p
            className="flex justify-end p-4 px-5 mr-10"
            style={{ marginLeft: 'auto' }}
          >
            &#8942;
          </p>
        </div>
      </div>
    </header>
  );
}
