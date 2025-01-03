import React, { useEffect } from 'react';
import Gnb from '../ui/Gnb';
import Snb from '../ui/Snb';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  useOepnUpdateModal,
  useOpenMainPage,
  useOpenMypage,
  useLoginAndCreateAccount,
} from '../store/store';
import ModifyModal from '../ui/ModifyModal';
import { useQuery } from 'react-query';
import { fetchUserData } from '../apis/apiUserData';
import { useMyRole, useUserMain } from '../store/UserMain/store';
import DropDownUser from '../ui/DropDownUser';
import { getUserImg } from '../apis/apiAuth';
import { useAuthStore } from '../store/AuthStore/authStore';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { openMainPage } = useOpenMainPage((state) => state);
  const { openMypage } = useOpenMypage((state) => state);
  const { openUpdateModal } = useOepnUpdateModal((state) => state);
  const { loggedInUserId } = useLoginAndCreateAccount(state => ({
    loggedInUserId: state.loggedInUserId
  }));

  const {
    setUserMainData,
    userMainData,
    setIsOpenDropdown,
    isOpenDropdown,
    setImageOfUser,
  } = useUserMain((state) => state);

  const { data: userData } = useQuery(
    ['userData', loggedInUserId],
    () => fetchUserData(loggedInUserId),
    {
      enabled: !!loggedInUserId && isAuthenticated,
      onSuccess: (data) => {
        setUserMainData(data?.data);
      },
      retry: false
    }
  );

  const { data: userImage } = useQuery(
    ['userImg'], 
    getUserImg, 
    {
      enabled: !!userData && isAuthenticated,
      onSuccess: (data) => {
        setImageOfUser(data?.data?.image);
      },
      retry: false
    }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
      </div>
    </>
  );
}
