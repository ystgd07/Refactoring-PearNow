import React from 'react';
import Form from '../ui/Form';
import { useLoginAndCreateAccount } from '../store/store';

export default function Login() {
  const { ...loginSlice } = useLoginAndCreateAccount((state) => state);

  return (
    <Form
      title={'로그인'}
      label1={'아이디'}
      label2={'패스워드'}
      btnName={'로그인'}
      checkValid={loginSlice.isValidLogin}
    />
  );
}
