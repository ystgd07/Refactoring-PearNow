import React from 'react';
import Form from '../ui/Form';
import { useLoginAndCreateAccount } from '../store/store';

const Login: React.FC = () => {
  const { isValidLogin } = useLoginAndCreateAccount((state) => ({
    isValidLogin: state.isValidLogin
  }));

  return (
    <Form
      title={'로그인'}
      label1={'아이디'}
      label2={'패스워드'}
      btnName={'로그인'}
      checkValid={isValidLogin}
      link={'회원가입'}
    />
  );
};

export default Login;
