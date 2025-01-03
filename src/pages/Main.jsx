import React from 'react';
import { useQuery } from 'react-query';
import { useAuthStore } from '../store/AuthStore/authStore';
import Title from '../features/newproject/Title';
import MyProjectCard from '../features/newproject/MyProjectCard';
import PjtInfo from '../features/newproject/PjtInfo';
import {
  useCreatePjtOne,
  useOpenMainPage,
  useProjectModal,
} from '../store/store';
import axios from 'axios';
import ContentLoader, { Instagram } from 'react-content-loader';
import SideModal from '../features/newproject/SideModal';

export default function Main() {
  const { isAuthenticated } = useAuthStore();
  const { setPjtModalFalse } = useProjectModal((state) => state);
  const { 
    openMainPage, 
    pjtObjInInitial, 
    setPjtObjInInitial 
  } = useOpenMainPage((state) => state);
  const { pjtObj, setPjtObj } = useCreatePjtOne((state) => state);

  const { data, isLoading, refetch: sideModalClick } = useQuery(
    ['pjtCard'],
    async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/project/list`,
        {
          withCredentials: true,
        }
      );
      return res;
    },
    {
      enabled: isAuthenticated,
      onSuccess: (data) => {
        setPjtObjInInitial(data?.data?.datalist);
      },
      retry: false
    }
  );

  if (!isAuthenticated) return null;

  return (
    <div className="w-[98%] rounded-lg m-1 my-2 bg-white">
      <div className={`relative flex flex-row justify-center ml-5 w-full`}>
        <div className={`flex flex-col`}>
          <Title />
          <div
            className="flex flex-col items-center justify-center"
            onClick={setPjtModalFalse}
          >
            {data !== undefined ? (
              <div className="flex rl">
                <div className="flex flex-col gap-3 p-6 overflow-y-scroll border-2 rounded-lg shadow-lg h-pjtCardSection border-slate-200 bg-slate-50 scrollbar-thumb-amber-400 scrollbar-thumb-rounded-full scrollbar-track-slate-50 scrollbar-thin ">
                  {!isLoading &&
                    pjtObjInInitial?.map((res, idx) => (
                      <MyProjectCard res={res} key={idx} />
                    ))}
                </div>
                <PjtInfo />
              </div>
            ) : (
              <div className="h-64 w-96">
                <Instagram />
              </div>
            )}
          </div>
        </div>
        {openMainPage ? <SideModal sideEvent={sideModalClick} /> : ''}
      </div>
    </div>
  );
}
