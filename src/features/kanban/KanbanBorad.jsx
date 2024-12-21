import React, { useState } from 'react';
import Progress from './Progress';
import { useMutation, useQuery } from 'react-query';
import { updateKanbanList } from '../../apis/kanbanApis';
import { TiPin } from 'react-icons/ti';
import { useKanbanCloums, useKanbanData } from '../../store/KanbanStore/sotre';
import toast from 'react-hot-toast';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

export default function KanbanBoard() {
  const {
    colums,
    setNewColums,
    setCurrentSelectedBackLog,
    currentSelectedBackLogNo,
    setCurrentSelectedBackLogitem,
    currentSelectedBackLogitem,
    setCurrentSelectedImg,
    currentSelectedUserImg,
    currentStatus,
    setCurrentSelectedStatus,
    currentSelectedStatus,
    setPrevSelectedStatus,
    prevSelectedStatus,
  } = useKanbanCloums((state) => state);

  const onDragStart = (e, columnIndex, itemIndex) => {
    e?.dataTransfer?.setData('columnIndex', columnIndex);
    e?.dataTransfer?.setData('itemIndex', itemIndex);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const { mutate: updateKanbanData, isLoading } = useMutation(
    ({ currentSelectedBackLogNo, cStatus }) =>
      updateKanbanList(currentSelectedBackLogNo, cStatus),
    {
      onSuccess: (user) => {
        console.log('Success : ', user);

        // queryClient.invalidateQueries();
        // navigate('/home');
        // currentSelectedBackLogitem
        toast.custom((t) => (
          <div className="flex flex-col items-center p-3 bg-white shadow-lg rounded-xl">
            <img
              src={`data:image/*;base64,${currentSelectedUserImg}`}
              alt="백로그_담당자_이미지"
              className="w-8 h-8 mr-2 border-2 rounded-full border-slate-500"
            />

            <span className="ml-1 text-xl font-bold text-gray-800">
              {currentSelectedBackLogitem}
            </span>
            <div className="flex flex-row items-center justify-center">
              {/* {prevSelectedStatus === 'done' ? (
                <p className="mr-1 font-semibold text-green-500">완료</p>
              ) : prevSelectedStatus === 'ing' ? (
                <p className="mr-1 font-semibold text-sky-500">진행 중</p>
              ) : (
                <p className="mr-1 font-semibold text-pink-500">진행 예정</p>
              )} */}
              <p className="mr-3 font-semibold text-green-400">
                업데이트 성공!!
              </p>
              <FaArrowRightArrowLeft className="text-green-500" />

              {/* {currentSelectedStatus === '완료' ? (
                <p className="mr-1 font-semibold text-green-500">완료</p>
              ) : currentSelectedStatus === '진행 중' ? (
                <p className="mr-1 font-semibold text-sky-500">진행 중</p>
              ) : (
                <p className="mr-1 font-semibold text-pink-500">진행 예정</p>
              )} */}
            </div>
          </div>
        ));
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );

  const onDrop = (e, columnIndex) => {
    console.log('coumlIndex test:', columnIndex);
    const sourceColumnIndex = e?.dataTransfer?.getData('columnIndex');
    const itemIndex = e?.dataTransfer?.getData('itemIndex');

    if (sourceColumnIndex === columnIndex) return;

    const newColumns = [...colums];
    const [draggedItem] = newColumns[sourceColumnIndex]?.items.splice(
      itemIndex,
      1,
    );
    newColumns[columnIndex]?.items?.push(draggedItem);
    setNewColums(newColumns);
  };

  console.log('column :', colums);

  return (
    <div className="flex gap-4 m-4 ml-8">
      {colums?.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex-1 ${column?.color} p-4 rounded-lg`}
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, columnIndex);
            console.log('column status:', column?.status);
            updateKanbanData({
              currentSelectedBackLogNo,
              cStatus: column?.status,
            });
            setCurrentSelectedStatus(column?.status);

            console.log('onDrop column', column?.status);
          }}
        >
          <h2 className="flex flex-row">
            <span className="items-center text-3xl font-black text-red-500">
              <TiPin />
            </span>
            <Progress value={column?.status} />
          </h2>
          <h2 className="mb-4 text-xl font-bold">{column?.title}</h2>
          {column?.items &&
            column?.items?.map((item, itemIndex) => (
              <div
                key={item?.id}
                draggable
                onDragStart={(e) => {
                  onDragStart(e, columnIndex, itemIndex);
                  setCurrentSelectedBackLog(item?.no);
                  setCurrentSelectedBackLogitem(item?.title);
                  setCurrentSelectedImg(item?.image);
                  setPrevSelectedStatus(item?.status);
                }}
                className="p-4 mb-4 bg-white border rounded-lg cursor-move hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <img
                    src={`data:image/*;base64,${item?.image}`}
                    alt="백로그_담당자_이미지"
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <span className="ml-1 text-lg font-semibold text-gray-800">
                    {item?.title}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
