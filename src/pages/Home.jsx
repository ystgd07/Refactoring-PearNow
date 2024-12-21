import React from 'react';
import Gnb from '../ui/Gnb';
import Snb from '../ui/Snb';
import { Outlet } from 'react-router-dom';
import SideModal from '../features/newproject/SideModal';
import {
  useOepnUpdateModal,
  useOpenMainPage,
  useOpenMypage,
} from '../store/store';
import ModifyModal from '../ui/ModifyModal';
import { useQuery } from 'react-query';
import { fetchUserData } from '../apis/apiUserData';
import { useMyRole, useUserMain } from '../store/UserMain/store';
import DropDownUser from '../ui/DropDownUser';
import { getUserImg } from '../apis/apiAuth';
import {
  useBackLogPageRes,
  useBackNumStore,
  useProjectInBackLog,
} from '../store/BackLogStore/store';

export default function Home() {
  const { openMainPage } = useOpenMainPage((state) => state);
  const { openMypage } = useOpenMypage((state) => state);
  const { openUpdateModal } = useOepnUpdateModal((state) => state);

  const {
    setUserMainData,
    userMainData,
    setIsOpenDropdown,
    isOpenDropdown,
    setImageOfUser,
  } = useUserMain((state) => state);

  const { data: userData, isLoadingUserData } = useQuery(
    ['userData'],
    fetchUserData,
    {
      onSuccess: (data) => {
        setUserMainData(data?.data);
        console.log('userData : ', data);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  console.log('userDatauserData', userData);

  const { data: userImage2 } = useQuery(['userImg'], getUserImg, {
    enabled: !!userData,

    onSuccess: (data) => {
      // const reader = new FileReader();
      // reader.readAsBinaryString(data);
      console.log('userImg :', data);

      setImageOfUser(data?.data?.image);
    },
    onError: (error) => {
      console.log('error:', error);
    },
  });

  // console.log('userImage : ', userImage);
  return (
    <>
      <Gnb />
      <div className="relative flex flex-row min-h-screen">
        <Snb />
        <div className={`flex flex-1 w-full ${openMypage ? '' : ''} `}>
          <Outlet />
          {openUpdateModal && <ModifyModal />}
        </div>
        {isOpenDropdown && <DropDownUser />}
        {/* {openMainPage ? <SideModal /> : ''} */}
      </div>
    </>
  );
}
