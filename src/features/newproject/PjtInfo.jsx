import React, { useEffect } from 'react';
import PjtinfoTitle from './PjtinfoTitle';
import PjtInfoMain from './PjtInfoMain';
import { useHover, useProjectModal } from '../../store/store';
import PjtinfoDetail from './PjtinfoDetail';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import ContentLoader, { Facebook } from 'react-content-loader';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PjtInfo() {
  const { projectNumber, projectUserId, pjtModalData, setPjtModalData } =
    useProjectModal((state) => state);
  const notify = () => toast.success('프로젝트 정보를 불러왔습니다.');
  const { data: userListData, isLoading: isLoadingListData } = useQuery(
    ['pjtModalData', projectNumber, projectUserId],
    async () => {
      const res = await axios.get(
        // `/api/project/peerlist?projectNumber=${projectNumber}&owner=${projectUserId}`,
        // 변경사항 추후 적용
        `${process.env.REACT_APP_API_DOMAIN}/api/project/peerlist?projectNumber=${projectNumber}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
    {
      enabled: !!projectNumber,
      onSuccess: (data) => {
        console.log('undefined log : ', data);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: pjtDetail,
    isLoading: isPjtDetailLoading,
    refetch: pjtDetailRefatch,
  } = useQuery(
    ['pjtModalData', projectNumber],
    async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/project?projectNumber=${projectNumber}
        `,
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
    {
      enabled: !!userListData,
      // enabled: false,
      onSuccess: (data) => {
        notify();
        console.log('undefined log : ', data);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
      refetchOnWindowFocus: false,
    },
  );

  console.log('pjtModalData data : ', userListData);
  console.log('pjtDetail data : ', pjtDetail);

  const { hover } = useHover((state) => state);

  return (
    <div className="ml-3">
      <div
        // className={`transition-all duration-200 max-w-md p-4 bg-white border-gray-200 rounded-lg shadow-lg t w-screen h-full sm:p-8 dark:bg-gray-500 dark:border-gray-500 ${
        //   hover ? 'opacity-100' : 'hidden opacity-0'
        // } `}
        className={`transition-all duration-200 max-w-md p-4 bg-white border-gray-200 rounded-lg border t w-screen h-[32rem] sm:p-8 dark:bg-gray-500 dark:border-gray-500 ${
          hover ? 'opacity-100' : 'hidden opacity-0'
        } `}
      >
        {pjtDetail ? (
          <PjtinfoTitle
            startDate={pjtDetail?.data?.start_date}
            endDate={pjtDetail?.data?.end_date}
            title={pjtDetail?.data?.title}
          />
        ) : (
          <Facebook />
        )}
        <div className="flow-root">
          <ul role="list" className="divide-gray-200 dark:divide-gray-700">
            <div className="flex flex-row-reverse">
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-green-500">시작일</p>
                  <p className="text-xs font-semibold text-green-500">
                    {pjtDetail &&
                      format(
                        new Date(pjtDetail?.data?.start_date),
                        'yyyy-MM-dd',
                      )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-red-500">종료일</p>
                  <p className="text-xs font-semibold text-red-500">
                    {pjtDetail &&
                      format(new Date(pjtDetail?.data?.end_date), 'yyyy-MM-dd')}
                  </p>
                </div>
              </div>
            </div>
            {pjtDetail ? (
              <>
                <PjtinfoDetail detail={pjtDetail?.data?.detail} />
                <PjtInfoMain
                  workerList={userListData?.datalist}
                  title={pjtDetail?.data?.title}
                />
              </>
            ) : (
              <Facebook />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
