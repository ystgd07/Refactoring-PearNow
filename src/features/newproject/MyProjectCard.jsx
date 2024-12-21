import React from 'react';

import MyProjectCardTitle from './MyProjectCardTitle';
import MyProjectCardFooter from './MyProjectCardFooter';
import {
  useHover,
  useOepnUpdateModal,
  useProjectModal,
} from '../../store/store';
import MyProjectCardContent from './MyProjectCardContent';

export default function MyProjectCard({ res }) {
  const { setHover } = useHover((state) => state);
  const { pjtModal } = useProjectModal((state) => state);

  const { setProjectNumber, setProjectUserId } = useProjectModal(
    (state) => state,
  );
  const { setRequestData } = useOepnUpdateModal((state) => state);

  return (
    <div
      className={`border-2 max-w-md justify-center items-center bg-white border-gray-200 rounded-lg shadow-lg w-PjtCard h-16  dark:bg-gray-500 dark:border-gray-500 ${
        !pjtModal
          ? 'hover:bg-section hover:opacity-80 dark:hover:bg-gray-600 hover:scale-95'
          : ''
      }`}
      onClick={
        !pjtModal
          ? () => {
              setHover();
              console.log('res.no in pjt card', res.no);
              setProjectNumber(res.no);
              setProjectUserId(res.user_id);
              setRequestData(res);
            }
          : ''
      }
      id={res.no}
    >
      <div className="flex justify-between p-5">
        <MyProjectCardTitle title={res.title} res={res} />
        <MyProjectCardContent content={res.detail} />
        <MyProjectCardFooter strDate={res.start_date} endDate={res.end_date} />
      </div>
    </div>
  );
}
