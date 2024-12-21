import React from 'react';
import { useUserMain } from '../../store/UserMain/store';

export default function UserUpdateBtn({ state }) {
  const { setIsOpenUpdateModal, setModalState } = useUserMain((state) => state);
  return (
    <p
      className="font-bold text-blue-500 cursor-pointer hover:text-blue-600 hover:scale-110"
      onClick={() => {
        setModalState(state);
        setIsOpenUpdateModal();
      }}
    >
      수정
    </p>
  );
}
