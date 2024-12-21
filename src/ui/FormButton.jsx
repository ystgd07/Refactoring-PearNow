import { useMutation, useQuery, useQueryClient } from 'react-query';
import React from 'react';
import { loginApi, registApi } from '../apis/apiAuth';
import { useLoginAndCreateAccount } from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function FormButton({ checkValid, btnName, event }) {
  const { loginObj, setId, setpw, createAccountObj } = useLoginAndCreateAccount(
    (state) => state,
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation(loginApi, {
    onSuccess: (user) => {
      console.log('Success : ', user);
      queryClient.invalidateQueries();

      navigate('/home/main');
    },
    onError: (error) => {
      console.log('Error', error);
    },
  });

  const { mutate: createAccount, isCreateLoading } = useMutation(
    () => registApi(createAccountObj),
    {
      onSuccess: (user) => {
        console.log('Success : ', user);
        queryClient.invalidateQueries();
        navigate('/');
      },
      onError: (error) => {
        console.log('Error', error);
      },
    },
  );

  return (
    <div
      tabIndex="0"
      className={`w-full text-black bg-amber-400
        ${
          checkValid
            ? 'bg-amber-400 border-amber-400 border-4'
            : 'bg-slate-400 opacity-40 border-slate-400 border-4'
        }
    focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800 ${
      checkValid ? 'cursor-pointer' : 'cursor-not-allowed'
    }`}
      disabled={checkValid}
      onClick={() => {
        btnName === '로그인'
          ? login(loginObj)
          : createAccount(createAccountObj);
      }}
      onKeyDown={(e) => {
        console.log('E', e.key);
        if (e.key === 'Enter') {
          console.log('Enter');
          btnName === '로그인'
            ? login(loginObj)
            : createAccount(createAccountObj);
        }
      }}
    >
      <p className="text-lg font-bold text-white">{btnName}</p>
    </div>
  );
}
