import React from 'react';
import MyFeedback from './MyFeedback';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
export default function MyFeedbackPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-auto ">
        <div className="mt-10 mr-1">
          <a href="javascript:window.history.back();">
            <div
              className="flex flex-row-reverse items-center"
              onClick={() => navigate(-1)}
            >
              <p className="p-1 mt-2 font-bold hover:scale-105">뒤로가기</p>
              <TiArrowBackOutline className="cursor-pointer w-7 h-7 hover:scale-125"></TiArrowBackOutline>
            </div>
          </a>
        </div>
        <MyFeedback />
      </div>
    </>
  );
}
