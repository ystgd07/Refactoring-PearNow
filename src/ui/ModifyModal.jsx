import React, { useState } from 'react';
import { useOepnUpdateModal, useProjectModal } from '../store/store';
import DatePicker from 'react-datepicker';
import { updateApi } from '../apis/apiAuth';
import { useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ModifyModal() {
  const {
    openUpdateModal,
    setOpenUpdateModal,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setDateChangeValid,
  } = useOepnUpdateModal((state) => state);

  const { projectNumber } = useProjectModal((state) => state);
  const { requestData } = useOepnUpdateModal((state) => state);
  const queryClient = useQueryClient();

  const { mutate: updateDate, isUpdateLoading } = useMutation(
    () => {
      updateApi(projectNumber, {
        title: requestData.title,
        detail: requestData.detail,
        start_date: format(new Date(startDate), 'yyyy-MM-dd'),
        end_date: format(new Date(endDate), 'yyyy-MM-dd'),
      });
    },
    {
      onSuccess: (user) => {
        console.log('Success updateDate : ', updateDate);
        queryClient.invalidateQueries();
        setOpenUpdateModal();
        toast(`수정완료!`, {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );
  console.log('endDate : ', new Date(endDate).getTime());
  console.log('startDate : ', new Date(startDate).getTime());
  console.log('projectNumber :', projectNumber);
  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed ${
          !openUpdateModal ? 'hidden' : ''
        } top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md`}
      >
        <div className="relative w-full max-w-md max-h-full top-1/4 left-1/3 ">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={setOpenUpdateModal}
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                날짜 수정
              </h2>

              <div className="flex flex-col items-center mt-3">
                <label
                  for="email"
                  className="block mb-2 text-lg font-bold text-green-400 dark:text-white"
                >
                  시작 날짜
                </label>
                <DatePicker
                  dateFormat="yyyy.MM.dd"
                  shouldCloseOnSelect
                  minDate={new Date('2000-01-01')}
                  maxDate={new Date('2050-01-01')}
                  selected={new Date(startDate)}
                  onChange={(e) => {
                    setStartDate(e);
                    setDateChangeValid();
                  }}
                  className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-4 w-full ${
                    new Date(startDate).getTime() >= new Date(endDate).getTime()
                      ? 'border-red-600'
                      : 'border-green-400'
                  } `}
                />
              </div>
              <div className="flex flex-col items-center mt-3">
                <label
                  for="password"
                  className="block mt-3 mb-2 text-lg font-bold text-gray-900 text-red-500 dark:text-white"
                >
                  종료 날짜
                </label>
                <DatePicker
                  dateFormat="yyyy.MM.dd"
                  shouldCloseOnSelect
                  minDate={new Date('2000-01-01')}
                  maxDate={new Date('2050-01-01')}
                  selected={new Date(endDate)}
                  onChange={(e) => {
                    setEndDate(e);
                    setDateChangeValid();
                  }}
                  className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-4 w-full ${
                    new Date(startDate).getTime() >= new Date(endDate).getTime()
                      ? 'border-red-600'
                      : 'border-green-400'
                  } `}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 ${
                    new Date(startDate).getTime() < new Date(endDate).getTime()
                      ? ''
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={
                    new Date(startDate).getTime() < new Date(endDate).getTime()
                      ? false
                      : true
                  }
                  onClick={updateDate}
                >
                  제출
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
