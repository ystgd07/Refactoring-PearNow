import React from 'react';
import BacklogIcon from './BacklogIcon';

export default function Checkbox() {
  return (
    <>
      <div className="text-stone-600 ml-3 m-3">백로그를 선택해주세요</div>
      <div className="border-2 border-gray-300 rounded-lg p-3 mb-2 w-full grid grid-cols-3 gap-3">
        <BacklogIcon />
      </div>
    </>
  );
}
