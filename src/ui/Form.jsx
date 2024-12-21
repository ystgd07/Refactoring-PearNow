import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { useLoginAndCreateAccount } from '../store/store';
import FormButton from './FormButton';

export default function Form({ btnName, link, title, checkValid, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const { ...loginSlice } = useLoginAndCreateAccount((state) => state);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 400);
  }, []);

  const propsArray = Object.values(props);

  const testFn = () => {
    console.log('testFn');
  };

  return (
    <div className="w-full h-full bg-cover bg-section">
      <section className="border-2 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto border-2 md:h-screen lg:py-0 ">
          <img className="w-16 h-16" src="/favicon.ico" alt="logo" />
          <span className="mb-4 text-xl font-semibold">PeerNow</span>

          <div
            className={`w-full transition-all ease-in-out bg-white rounded-lg shadow ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } duration-2000 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}
          >
            <div className="p-6 space-y-2 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {title}
              </h1>

              <di className="h-full space-y-4 md:space-y-6" action="#">
                {propsArray.map((item, index) => (
                  <FormInput label1={item} key={index} title={title} />
                ))}

                {checkValid ? (
                  <FormButton
                    checkValid={checkValid}
                    btnName={btnName}
                    event={testFn}
                  />
                ) : (
                  <FormButton checkValid={checkValid} btnName={btnName} />
                )}

                <div className="flex flex-row justify-between">
                  {btnName === '로그인' && (
                    <div className="flex items-center justify-between text-red-400">
                      <button>비밀번호 찾기</button>
                    </div>
                  )}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {btnName !== '계정생성' ? (
                      <Link to="/signup">회원가입</Link>
                    ) : (
                      <Link to="/">로그인</Link>
                    )}
                  </p>
                </div>
              </di>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
