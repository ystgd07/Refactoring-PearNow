import React, { useEffect } from 'react';
import Form from '../ui/Form';
import { useAuthStore } from '../store/AuthStore/authStore';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../store/AuthStore/types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const handleLogin = async (formData: LoginCredentials) => {
    console.log('LocalStorage before login:', {
      access: localStorage.getItem('accessToken'),
      refresh: localStorage.getItem('refreshToken')
    });

    const success = await login(formData);

    console.log('LocalStorage after login:', {
      access: localStorage.getItem('accessToken'),
      refresh: localStorage.getItem('refreshToken')
    });

    if (success) {
      navigate('/home/main');
    }
  };

  return (
    <Form
      title={'로그인'}
      label1={'아이디'}
      label2={'패스워드'}
      btnName={'로그인'}
      checkValid={!loading}
      link={'회원가입'}
      event={handleLogin}
      error={error}
    />
  );
};

export default Login;
