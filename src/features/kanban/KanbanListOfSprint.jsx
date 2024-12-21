import React from 'react';
import { useSelectedSprint } from '../../store/SprintStore/store';

export default function KanbanListOfSprint({ list }) {
  const { setSprintNo, setProjectNo, setSprintTitle, setSelectedValidate } =
    useSelectedSprint((state) => state);
  console.log('list.no', list?.no);
  return (
    <p
      href="#"
      className="block px-4 py-2 mb-1 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        setProjectNo(list?.project_no);
        setSprintNo(list?.no);
        setSprintTitle(list?.title);
        setSelectedValidate();
      }}
    >
      {list?.title}
    </p>
  );
}
