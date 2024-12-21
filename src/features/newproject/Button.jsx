import React from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useProjectModal } from '../../store/store';

export default function Button() {
  const { setPjtModal, pjtModal } = useProjectModal((state) => state);

  return (
    <HiPlusCircle
      className={`ml-2 transition-all duration-200 cursor-pointer w-8 h-8 text-stone-800 z-50`}
      onClick={setPjtModal}
      style={{
        transform: `${pjtModal ? 'rotate(45deg)' : 'rotate(90deg)'} `,
        scale: `${pjtModal ? '0.9' : '1'} `,
        zIndex: 30,
      }}
    />
  );
}
