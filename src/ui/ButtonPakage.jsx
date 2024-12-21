import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProjectApi } from '../apis/apiAuth';
import { useCreatePjtOne, useProjectModal } from '../store/store';
import toast from 'react-hot-toast';

export default function ButtonPakage({ value, event, disabled }) {
  const { pjtObj, setPjtObj, reset } = useCreatePjtOne((state) => state);
  const { setPjtModalFalse } = useProjectModal((state) => state);

  console.log('명수를 찾겠습니다 pjtObj : ', pjtObj);
  const queryClient = useQueryClient();

  const { mutate: createPjt, isCreateLoading } = useMutation(
    () => {
      createProjectApi(pjtObj);
    },
    {
      onSuccess: (user) => {
        console.log('Success : ', user);
        setPjtObj();
        queryClient.invalidateQueries('pjtCard');
        reset();
        event();
        setPjtModalFalse();
        toast.success('프로젝트가 생성되었습니다.');
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );

  console.log('reset이 먹히는가?:', pjtObj);

  return (
    <div
      className={`ext-white ${
        !disabled ? 'bg-blue-700' : 'bg-slate-400 opacity-40'
      } focus:ring-2 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 w-full dark:hover:bg-blue-700 dark:focus:ring-blue-800   ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={
        value === '제출'
          ? () => {
              createPjt();
            }
          : event
      }
      disabled={disabled}
    >
      <p className="block text-slate-300"> {value}</p>
    </div>
  );
}
