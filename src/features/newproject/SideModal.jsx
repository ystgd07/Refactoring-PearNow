import React from 'react';
import SideModalHeader from './SideModalHeader';
import SideModalMain from './SideModalMain';
import { useProjectModal } from '../../store/store';

export default function SideModal({ sideEvent }) {
  const { pjtModal } = useProjectModal((state) => state);
  console.log('내가 혹시 범인 ??sidemodal pjtModal', pjtModal);

  return (
    <div
      className={`absolute top-0 right-0 transition-all h-screen duration-200 z-10 p-5 bg-white shadow-lg w-96 rounded-none ${
        pjtModal ? '' : 'hidden'
      }  ${pjtModal ? 'opacity-100 ' : 'opacity-0'} 
      `}
    >
      <SideModalHeader />
      <SideModalMain sideEvent={sideEvent} />
    </div>
  );
}
