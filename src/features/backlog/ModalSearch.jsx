import React from 'react';
import {
  createBackLog,
  useBackLogPageRes,
  useBackNumStore,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';

export default function ModalSearch({ visible }) {
  const { pjtDetailData } = useProjectInBackLog((state) => state);
  const { setCurrentModiftBackLogMananger } = useBackNumStore((state) => state);
  const {
    setCurrentSearcUser,
    setCurrentBackLogManager,
    currentBackLogMananger,
    setCurrentBackLogImage,
    setCurrentBackLogTeam,
  } = useBackLogPageRes((state) => state);
  const { setUserId } = createBackLog((state) => state);

  return (
    <div
      className={`z-60 ${
        !visible && 'hidden'
      } bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
    >
      <div className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200">
        {pjtDetailData.map((e, idx) => (
          <div
            onClick={() => {
              setUserId(e.id);
              setCurrentBackLogImage(e.image);
              setCurrentBackLogTeam(e.team);
              setCurrentBackLogManager(e.name);
              setCurrentSearcUser();
            }}
            key={idx}
            className="flex flex-row items-center hover:bg-gray-100 hover:scale-105 "
          >
            <div className="text-lg font-bold flex items-center px-4 py-2 ">
              <img
                className="w-6 h-6 mr-2 rounded-full"
                // src={e.image}
                src={`data:image/*;base64,${e.image}`}
                alt={e.name}
              />
              {e.name}
            </div>
            <p className="font-thin text-slate-500">{e.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
