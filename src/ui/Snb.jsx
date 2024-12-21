import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Snb() {
  const navigate = useNavigate();

  return (
    <>
      <div
        id="drawer-navigation"
        // className="relative left-0 z-50 w-1/6 h-full p-5 border-r bg-slate-100 border-slate-200"
        className="relative left-0 z-50 w-1/6 p-5 rounded-xl m-2 mx-4 bg-white "
        tabIndex="1"
        aria-labelledby="drawer-navigation-label"
      >
        <p className="flex md:mr-14">
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
            <span
              id="drawer-navigation-label"
              className="text-xl text-center font-semibold items-center text-gray-500 uppercase dark:text-gray-400 ml-3 flex flex-row"
            >
              <span className="ml-1">메뉴</span>
            </span>
          </span>
        </p>
        <button
          type="button"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover-text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover-bg-gray-600 dark:hover-text-white"
        ></button>
        <div className="py-2 overflow-y-auto cursor-pointer">
          <ul className="space-y-2 font-medium">
            {/* 나의 프로젝트 */}
            <Link to={'/home/main'}>
              <li className="text-lg">
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover-bg-gray-700 group hover:bg-gray-100">
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover-text-gray-900 dark-group-hover-text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0" />
                  </svg>
                  <span className="ml-3">나의 프로젝트</span>
                </p>
              </li>
            </Link>
            {/* 백로그 */}
            <Link to={'/home/MyPage'}>
              <li className="text-lg">
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover-bg-gray-700 group hover:bg-gray-100">
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover-text-gray-900 dark-group-hover-text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="ml-3">대시보드</span>
                </p>
              </li>
            </Link>
            {/* 동료 평가 */}
            <Link to={'/home/feedback'}>
              <li className="text-lg">
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover-bg-gray-700 group hover:bg-gray-100">
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover-text-gray-900 dark-group-hover-text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="ml-3">동료 평가</span>
                </p>
              </li>
            </Link>
          </ul>
        </div>
        {/*  */}
        <div></div>
      </div>
    </>
  );
}
