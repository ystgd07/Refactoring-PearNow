import React from 'react';
import { UseBackLog } from '../../store/BackLogStore/store';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function BacklogResult() {
  const { setSearchRes, searchUser, setSearchUser, searchRes } = UseBackLog(
    (state) => state,
  );

  const { data: backLogUserList, isLoading } = useQuery(
    ['userList', searchUser],
    async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/project/peer?peerName=${searchUser}`,
        {
          withCredentials: true,
        },
      );
      return res;
    },
    {
      enabled: !!searchUser,
      onSuccess: (data) => {
        console.log('undefined log : ', data);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div
      className={`scrollbar absolute z-50 scrollbar-thumb-amber-500   ${
        !searchUser > 0 ? 'hidden' : ''
      } h-32 py-3 mt-8 overflow-y-scroll text-sm bg-white rounded-md w-full shadow-md top-44 right-0`}
      // onClick={}
    >
      {!isLoading &&
        backLogUserList &&
        backLogUserList?.data.datalist?.map((user, idx) => (
          <div
            className="flex justify-start px-2 py-2 my-2 text-gray-700 rounded-md cursor-pointer hover:text-blue-400 hover:bg-blue-100"
            key={idx}
          >
            <span className="w-2 h-2 m-2 bg-gray-400 rounded-full"></span>
            <div className="flex-grow px-2 font-medium">{user.name}</div>
            <div className="text-sm font-normal tracking-wide text-gray-500">
              {user.team ? user.team : '무소속'}
            </div>
          </div>
        ))}
    </div>
  );
}
