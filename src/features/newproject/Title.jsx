import React from 'react';
import Button from './Button';

export default function Title() {
  return (
    <div className="flex mt-4">
      <div className="flex flex-row items-center justify-center py-5 text-2xl ml-1 w-fit">
        <p className="font-bold text-gray-700">나의 프로젝트</p>
        <Button />
      </div>
    </div>
  );
}
