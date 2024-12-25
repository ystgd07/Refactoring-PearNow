import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { useLoginAndCreateAccount } from '../store/store';
import FormButton from './FormButton';

interface FormProps {
  btnName: string;
  link: string;
  title: string;
  checkValid: boolean;
  [key: string]: any; // 동적 props를 위한 인덱스 시그니처
}

interface FormButtonProps {
  checkValid: boolean;
  btnName: string;
  event?: () => void;
}

const Form: React.FC<FormProps> = ({ btnName, link, title, checkValid, ...props }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const loginSlice = useLoginAndCreateAccount((state) => state);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 400);
  }, []);

  const propsArray: string[] = Object.values(props);

  const testFn = (): void => {
    console.log('testFn');
  };

  return (
    <div className="w-full h-full bg-cover bg-section">
      <section className="border-2 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto border-2 md:h-screen lg:py-0">
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

              <div className="h-full space-y-4 md:space-y-6">
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
                  <FormButton checkValid={checkValid} btnName={btnName} event={testFn} />
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
