import React from 'react';
import { useLoginAndCreateAccount } from '../store/store';

export default function FormInput({ ...props }) {
  const {
    loginObj,
    setId,
    setpw,
    setLoginValid,
    setpwCheck,
    createAccountObj,
    setCreateAccountValid,
    setName,
    checkPw,
    setCheckPw,
    setCheckPwVaild,
    setAccountpw,
    setAccountName,
    setAccountId,
    isValidCreateAccount,
  } = useLoginAndCreateAccount((state) => state);

  const changeInputHandler = (e) => {
    console.log('create validate', isValidCreateAccount);
    if (props.title === '로그인') {
      if (props.label1 === '패스워드') {
        setpw(e.target.value);
        setLoginValid();
      }

      if (props.label1 === '아이디') {
        setId(e.target.value);
        setLoginValid();
      }
    }

    if (props.title === '회원가입') {
      if (props.label1 === '아이디') {
        setAccountId(e.target.value);
        setCreateAccountValid();
      }

      if (props.label1 === '패스워드') {
        setAccountpw(e.target.value);
        setCreateAccountValid();
      }

      if (props.label1 === '패스워드 확인') {
        setCheckPw(e.target.value);
        setCheckPwVaild();
        setCreateAccountValid();
      }

      if (props.label1 === '이름') {
        setName(e.target.value);
        setCreateAccountValid();
      }
    }
  };

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {props.label1}
      </label>
      {props.title === '로그인' ? (
        <input
          type={`${
            props.label1 === '패스워드 확인' || props.label1 === '패스워드'
              ? 'password'
              : 'text'
          }`}
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
          placeholder={`${props.label1.slice(0, 8)}`}
          required=""
          onChange={changeInputHandler}
          value={props.label1 === '아이디' ? loginObj.id : loginObj.pw}
        />
      ) : (
        <input
          type={`${
            props.label1 === '패스워드 확인' || props.label1 === '패스워드'
              ? 'password'
              : 'text'
          }`}
          name="email"
          id="email"
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
            !setpwCheck && props.label1 === '패스워드 확인'
              ? 'border-red-500'
              : 'border-gray-300'
          }  h-10`}
          placeholder={`${props.label1.slice(0, 8)}`}
          required=""
          onChange={changeInputHandler}
          value={
            props.label1 === '아이디'
              ? createAccountObj.id
              : props.label1 === '패스워드'
              ? createAccountObj.pw
              : props.label1 === '패스워드 확인'
              ? checkPw
              : createAccountObj.name
          }
        />
      )}
      {!setpwCheck && props.label1 === '패스워드 확인' && (
        <p className="p-1 text-xs text-red-500">
          비밀번호가 일치하지 않습니다.
        </p>
      )}
    </div>
  );
}
