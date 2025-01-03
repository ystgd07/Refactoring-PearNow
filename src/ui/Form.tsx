import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { LoginCredentials } from '../store/AuthStore/types';

interface FormProps {
  btnName: string;
  link: string;
  title: string;
  checkValid: boolean;
  label1: string;
  label2: string;
  label3?: string;
  isSignUp?: boolean;
  event: (formData: LoginCredentials & { name?: string }) => Promise<void>;
  error?: string | null;
}

const Form: React.FC<FormProps> = ({ 
  btnName, 
  link, 
  title, 
  checkValid, 
  label1, 
  label2,
  label3,
  isSignUp,
  event,
  error 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginCredentials & { name?: string }>({
    id: '',
    pw: '',
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await event(formData);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 400);
  }, []);

  return (
    <div className="w-full h-full bg-cover bg-section">
      <section className="border-2 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto border-2 md:h-screen lg:py-0">
          <img className="w-16 h-16" src="/favicon.ico" alt="logo" />
          <span className="mb-4 text-xl font-semibold">PeerNow</span>

          <div className={`w-full transition-all ease-in-out bg-white rounded-lg shadow ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } duration-2000 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
            <div className="p-6 space-y-2 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {title}
              </h1>

              <form className="h-full space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <FormInput 
                  label={label1}
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
                <FormInput 
                  label={label2}
                  type="password"
                  name="pw"
                  value={formData.pw}
                  onChange={handleInputChange}
                />
                {isSignUp && label3 && (
                  <FormInput 
                    label={label3}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                )}

                <FormButton
                  checkValid={checkValid}
                  btnName={btnName}
                  type="submit"
                />

                <div className="flex flex-row justify-between">
                  {btnName === '로그인' && (
                    <div className="flex items-center justify-between text-red-400">
                      <button type="button">비밀번호 찾기</button>
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

                {error && (
                  <div className="text-red-500 text-sm mt-2">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
