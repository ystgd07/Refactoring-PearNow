import React from 'react';
import { useMutation, QueryClient, useQuery } from 'react-query';
import { fetchStatusUpdateData } from '../../apis/apiStatusUpdate';
import { fetchInviteProject } from '../../apis/apiProject';
import { useStatusUpdate } from '../../store/UserMain/store';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function UserStatusItem({ item, refetch }) {
  const { setStatusUpdateData, setUpdateDeclineStatus, statusUpdateData } =
    useStatusUpdate((state) => state);

  const { mutate: statusAccepUpdate, isAccepLoading } = useMutation(
    () => fetchStatusUpdateData('ACCEPT', item?.project_number, item?.role),
    {
      onSuccess: (user) => {
        console.log('Success : ', user);
        toast.success(`${item?.project_title} 초대 승낙`);
        refetch();
        setStatusUpdateData(user);
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );

  const { mutate: statusDeclineUpdate, isDeclineLoading } = useMutation(
    () => fetchStatusUpdateData('DECLINE', item?.project_number),
    {
      onSuccess: (user) => {
        console.log('Success : ', user);
        refetch();
        setUpdateDeclineStatus(user);
        toast.error(`${item?.project_title} 초대 거절`);
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );
  console.log('UserStatusItem : ', item);
  return (
    <div className="mb-5 ">
      <div className="flex items-centerh-fit border-slate-300 ">
        <div className="flex flex-row items-center w-2/5">
          <div className="mr-4">
            <img
              className="w-10 h-10 border-2 border-black rounded-full"
              // src="/img/je.jfif"
              src={`data:image/*;base64,${item?.owner_image}`}
              alt="Neil image"
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">{item?.owner_name}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-2/5">
          <div className="flex flex-col items-center">
            <p className="text-xl font-extrabold text-[#ac9325] ">
              {item?.project_title}
            </p>
            <p className="text-sm font-semibold truncate text-slate-400">
              권한 : {item?.role}
            </p>
          </div>
        </div>
        <div className="flex justify-center w-1/5">
          {statusUpdateData?.acceptStatus === 'success' ||
          item?.status === 'WAIT' ? (
            <button
              type="button"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 mr-5 text-sm font-semibold text-white transition-all bg-green-400 border border-transparent rounded-md hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={statusAccepUpdate}
            >
              승낙
            </button>
          ) : (
            item?.status === 'ACCEPT' && (
              <div className="flex justify-center w-full">
                <FaUserCheck className="text-2xl text-[#c1f5b4]"></FaUserCheck>
              </div>
            )
          )}
          {item?.status === 'WAIT' ? (
            <button
              type="button"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold text-white transition-all bg-red-400 border border-transparent rounded-md hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={statusDeclineUpdate}
            >
              취소
            </button>
          ) : (
            item?.status === 'DECLINE' && (
              <div className="flex gap-3">
                <FaUserTimes className="text-2xl text-red-600"></FaUserTimes>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
