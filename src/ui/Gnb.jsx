import React, { useState, useEffect, useRef } from 'react';
import { useImage, useUserMain } from '../store/UserMain/store';
import { GrUserSettings } from 'react-icons/gr';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

export default function Gnb() {
  const { userMainData, setIsOpenDropdown, headerUserImg } = useUserMain(
    (state) => state,
  );
  const { setUserImg, stateImageData } = useImage((state) => state);
  console.log('headerUserImg', headerUserImg);
  const navigate = useNavigate();

  return (
    <header className="relative items-center justify-between pl-5 pr-5 bg-white cursor-pointer mb-2">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600"
            ></button>
            <p className="flex md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                <span
                  id="drawer-navigation-label"
                  className="text-3xl text-center font-extrabold items-center text-gray-700 uppercase dark:text-gray-400 ml-3 flex flex-row"
                >
                  {/* <img
                    src="/peernow.png"
                    alt="로고"
                    className="h-12 w-12"
                    onClick={() => {
                      navigate('/home/main');
                    }}
                  /> */}
                  <span className="ml-1 flex items-center">
                    PeerN
                    <span className="text-[#f7cc10]">
                      <img
                        src="/peernow.png"
                        alt="로고"
                        className="h-8 w-8"
                        onClick={() => {
                          navigate('/home/main');
                        }}
                      />
                    </span>
                    w
                  </span>
                </span>
              </span>
            </p>
          </div>
          {/* 로그인 안되면 보여주면 안됨 */}
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div
                onClick={() => {
                  setIsOpenDropdown();
                }}
              >
                <ui className="flex items-center mr-3 list-none">
                  <li>
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus-ring-4 focus-ring-gray-300"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open user menu</span>
                      {stateImageData.userImg !== '' ? (
                        <img
                          className="font-medium rounded-full w-11 h-11 hover:bg-gray-400 focus:ring-3 focus:ring-gray-300"
                          // src="testImg.jpg"
                          src={stateImageData.userImg}
                          alt="user photo"
                        />
                      ) : (
                        <img
                          className="font-medium rounded-full w-11 h-11 hover:bg-gray-400 focus:ring-3 focus:ring-gray-300"
                          // src="testImg.jpg"
                          src={`data:image/*;base64,${headerUserImg}`}
                          alt="user photo"
                        />
                      )}
                    </button>
                  </li>
                  <li className="pl-3 text-xl font-semibold text-gray-800">
                    {userMainData.name}
                  </li>
                </ui>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
