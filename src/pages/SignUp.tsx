import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../ui/Form';
import { useLoginAndCreateAccount } from '../store/store';

export default function SignUp() {
  const { ...loginSlice } = useLoginAndCreateAccount((state) => state);
  return (
    <Form
      title={'회원가입'}
      label1={'아이디'}
      label2={'패스워드'}
      label3={'패스워드 확인'}
      label4={'이름'}
      btnName={'계정생성'}
      link={'/signup'}
      checkValid={loginSlice.isValidCreateAccount}
    />
  );
}
