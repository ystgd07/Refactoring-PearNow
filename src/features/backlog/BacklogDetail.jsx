import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ModalRadio from './ModalRadio';
import {
  AllBacklogOfThisPjt,
  BacklogDetailData,
  UseBackLog,
  createBackLog,
  useBackLogPageRes,
  useBackNumStore,
} from '../../store/BackLogStore/store';
import { fetchBacklogDetail, updateBacklogData } from '../../apis/backLogApis';
import ModalSearch from './ModalSearch';
import toast from 'react-hot-toast';

export default function BacklogDetail() {
  const { queryClient } = useQueryClient();
  const { backlogDto, addFileName, backFileDto } = createBackLog(
    (state) => state,
  );
  // 백로그 유저 서치
  const { setSearchRes, searchUser, setSearchUser, searchRes } = UseBackLog(
    (state) => state,
  );

  // 헤더 프로젝트 번호
  const {
    currentProjectNumber,
    currentSearchUser,
    setCurrentSearcUser,
    currentBackLogMananger,
  } = useBackLogPageRes((state) => state);

  // 전체 백로그 확인
  const { backlogData } = AllBacklogOfThisPjt((state) => state);

  // 백로그 번호 상태
  const {
    backNum,
    setBackNum,
    selectedBackObj,
    setSelectedStatus,
    setSelectedTitle,
    setSelectedUserID,
    setSelectedDetail,
  } = useBackNumStore();

  console.log('[BackNum111====> ', backlogData);
  console.log('[BackNum222====> ', backlogData.no);

  // 백로그 상세 페이지 불러오기
  const { backlogDetailData, setBacklogDetailData } = BacklogDetailData(
    (state) => state,
  );
  const { data: backDetailData, isLoading: backDetailLoading } = useQuery(
    ['fetchBacklogDetail', backNum],
    () => fetchBacklogDetail(backNum),
    {
      enabled: !!backNum,
      onSuccess: (data) => {
        setBacklogDetailData(data?.data?.datalist);
      },
    },
  );
  console.log('backlogDetailData~ : ', selectedBackObj);

  // 백로그 수정
  const { mutate: updateBacklog, isLoading: isUpdateBacklogLoading } =
    useMutation(
      () => updateBacklogData(backNum, selectedBackObj, backFileDto),
      {
        onSuccess: (user) => {
          console.log('Success updateBacklog : ', user);
          queryClient.invalidateQueries();
          toast.success('백로그가 업데이트 되었습니다');
        },
        onError: (error) => {
          console.log('Error', error);
        },
      },
    );

  return (
    <>
      <div>
        <div className="relative flex-1 px-4 mt-6 sm:px-6">
          <ModalRadio onChange={(e) => setSelectedStatus(e.target.value)} />
          <input
            name="title"
            className="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
            placeholder=" *무엇을 해야합니까"
            value={selectedBackObj?.title}
            onChange={(e) => setSelectedTitle(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
            value={backlogDto?.user_id}
            onChange={(e) => setSelectedUserID(e.target.value)}
            onClick={() => setCurrentSearcUser(true)}
          />
          <ModalSearch visible={currentSearchUser} />
          <input
            name="detail"
            // onChange={(e) => setDetail(e.target.value)}
            className="w-full p-2 mb-4 border-2 border-gray-300 rounded-md"
            placeholder="설명을 입력할 수 있습니다"
            value={selectedBackObj?.detail}
            onChange={(e) => setSelectedDetail(e.target.value)}
          />
          <div className="items-center">
            <input
              type="file"
              name="name"
              onChange={(e) => {
                addFileName(e?.target?.files[0]);
              }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
            />
          </div>
          <div className="float-right my-2">
            <button
              className="mr-1 -mb-6 text-right"
              onClick={() => {
                updateBacklog(backNum, selectedBackObj, backFileDto);
              }}
            >
              <span
                className={`text-lg bg-gray-300 p-1 px-4 rounded-md hover:bg-gray-400 `}
              >
                {isUpdateBacklogLoading ? '수정 중...' : '수정'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
