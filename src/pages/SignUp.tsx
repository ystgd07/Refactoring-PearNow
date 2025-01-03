import React from 'react';
import Form from '../ui/Form';
import { useAuthStore } from '../store/AuthStore/authStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../store/AuthStore/types';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();

  const handleSignUp = async (formData: LoginCredentials & { name?: string }) => {
    const success = await register({
      id: formData.id,
      pw: formData.pw,
      name: formData.name || ''
    });

    if (success) {
      navigate('/');
    }
  };

  return (
    <Form
      title={'회원가입'}
      label1={'아이디'}
      label2={'패스워드'}
      label3={'이름'}
      btnName={'계정생성'}
      link={'/'}
      checkValid={!loading}
      event={handleSignUp}
      error={error}
      isSignUp={true}
    />
  );
};

export default SignUp;
