import React from 'react';
import { useUserMain } from '../../store/UserMain/store';
import { useMutation, QueryClient } from 'react-query';
import { fetchUserData, fetchUserUpdateData } from '../../apis/apiUserData';
import { useForm } from 'react-hook-form';
export default function UserUpdateModal() {
  const {
    setIsOpenUpdateModal,
    userMainData,
    modalState,
    updateTeam,
    updatePhone,
    updateMail,
    setUpdateMail,
    setUpdatePhone,
    setUpdateTeam,
    setUserMailOfMainData,
    setUserPhoneOfMainData,
    setUserTeamOfMainData,
    userMainUpdateData,
  } = useUserMain((state) => state);
  console.log('userMainUpdateData', userMainData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userMemberDto: {
        name: userMainData.name,
        image: userMainData.image,
        mail: userMainData.mail,
        phone: userMainData.phone,
        team: userMainData.team,
      },
    },
  });

  const queryClient = new QueryClient();
  console.log('userMainData1', userMainData);
  const stateQuarter =
    modalState === '이메일'
      ? updateMail
      : modalState === '전화번호'
      ? updatePhone
      : updateTeam;

  const placeholderStatus =
    modalState === '이메일'
      ? userMainData.mail
      : modalState === '전화번호'
      ? userMainData.phone
      : userMainData.team;

  const { mutate: updateUserData, isUpdateLoading } = useMutation(
    ({ data, id }) => fetchUserUpdateData(data, id),
    {
      onSuccess: (user) => {
        console.log('Success : ', user);
        fetchUserData();
        queryClient.invalidateQueries();
        setIsOpenUpdateModal();
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );

  return (
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`fixed  top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md`}
    >
      <div className="relative w-full max-w-md max-h-full top-1/4 left-1/3 ">
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={setIsOpenUpdateModal}
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
          <form
            onSubmit={handleSubmit((data) => {
              console.log(
                'form datatype : ',
                data,
                'form modalState :',
                modalState,
              );

              updateUserData({ data, id: userMainData?.id });

              console.log('userMainData.id : ', userMainData?.id);
            })}
            className="px-6 py-6 lg:px-8"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {modalState} 수정
            </h2>
            {modalState === '이메일' ? (
              <input
                defaultValue="test"
                {...register('userMemberDto.mail')}
                type={`${modalState === '이메일' ? 'email' : 'text'}`}
                placeholder={placeholderStatus}
                className="w-full"
                onChange={(e) => {
                  setUpdateMail(e.target.value);
                }}
                value={updateMail}
              ></input>
            ) : modalState === '전화번호' ? (
              <input
                defaultValue="test"
                {...register('userMemberDto.phone')}
                type={`${modalState === '이메일' ? 'email' : 'text'}`}
                placeholder={placeholderStatus}
                value={updatePhone}
                onChange={(e) => {
                  setUpdatePhone(e.target.value);
                }}
                className="w-full"
              ></input>
            ) : (
              <input
                defaultValue="test"
                {...register('userMemberDto.team')}
                type={`${modalState === '이메일' ? 'email' : 'text'}`}
                placeholder={placeholderStatus}
                className="w-full"
                onChange={(e) => {
                  setUpdateTeam(e.target.value);
                }}
                value={updateTeam}
              ></input>
            )}

            <div className="flex justify-center">
              <input
                type="submit"
                className={`w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 `}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
