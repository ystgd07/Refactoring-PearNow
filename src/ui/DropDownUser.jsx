import React from 'react';
import { GrUserSettings } from 'react-icons/gr';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useUserMain } from '../store/UserMain/store';
import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../apis/apiAuth';
import { useMutation, useQueryClient } from 'react-query';

export default function DropDownUser() {
  const { userMainData, setIsOpenDropdown } = useUserMain((state) => state);
  const navigate = useNavigate();

  const { mutate: logout, isLoading: islogout } = useMutation(
    () => logoutApi(),
    {
      onSuccess: (user) => {
        console.log('Success logout : ', user);
        navigate('/');
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );

  return (
    <div
      className="absolute top-0 right-0 w-48 p-4 bg-white border-2 divide-y rounded-md shadow-md cursor-pointer bg-sl"
      onClick={() => {
        console.log('hihihi');
      }}
    >
      <p className="mb-3 text-base text-center items-center truncate">
        {userMainData.mail}
      </p>
      <div>
        <div
          className="flex flex-row-reverse items-center justify-center gap-2 p-2 cursor-pointer hover:bg-slate-100 "
          onClick={(e) => {
            e.stopPropagation();
            navigate('/home/main/usermain');
            setIsOpenDropdown();
          }}
        >
          <p className="mt-2 text-sm font-bold ">설정</p>
          <GrUserSettings className="mt-3"></GrUserSettings>
        </div>
        <div
          className="flex flex-row-reverse items-center justify-center gap-2 p-3 cursor-pointer hover:bg-slate-100 "
          onClick={(e) => {
            e.stopPropagation();
            navigate('/home/main/usermain');
            setIsOpenDropdown();
          }}
        >
          <p
            className="mt-2 text-sm font-bold "
            onClick={(e) => {
              e.stopPropagation();
              logout();
              console.log('로그아웃');
            }}
          >
            로그아웃
          </p>
          <RiLogoutBoxRLine className="mt-3"></RiLogoutBoxRLine>
        </div>
      </div>
    </div>
  );
}
