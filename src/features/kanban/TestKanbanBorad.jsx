import React, { useState } from 'react';
import Progress from './Progress';
import KanbanBacklog from './KanbanBacklog';

export default function TestKanbanBoard() {
  const [columns, setColumns] = useState([
    {
      title: '진행 예정',
      color: 'bg-red-500',
      items: [
        { id: 1, text: '화면 설계서 작성', imgSrc: 'testImg.jpg' },
        { id: 2, text: 'API 명세서 작성', imgSrc: 'testImg.jpg' },
      ],
    },
    {
      title: '진행 중',
      color: 'bg-blue-500',
      items: [
        { id: 3, text: '인프라 아키텍처 그리기', imgSrc: 'testImg.jpg' },
        { id: 4, text: 'Route53 도메인 연결', imgSrc: 'testImg.jpg' },
      ],
    },
    {
      title: '완료',
      color: 'bg-green-500',
      items: [{ id: 5, text: '메인페이지 UI 작업', imgSrc: 'testImg.jpg' }],
    },
  ]);

  const onDragStart = (e, columnIndex, itemIndex) => {
    e.dataTransfer.setData('columnIndex', columnIndex);
    e.dataTransfer.setData('itemIndex', itemIndex);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, columnIndex) => {
    const sourceColumnIndex = e.dataTransfer.getData('columnIndex');
    const itemIndex = e.dataTransfer.getData('itemIndex');

    if (sourceColumnIndex === columnIndex) return;

    const newColumns = [...columns];
    const [draggedItem] = newColumns[sourceColumnIndex].items.splice(
      itemIndex,
      1,
    );
    newColumns[columnIndex].items.push(draggedItem);
    setColumns(newColumns);
  };

  return (
    <div className="grid grid-cols-3 m-4 ml-8">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, columnIndex)}
        >
          <h2>
            <Progress value={column.title} color={column.color} />
          </h2>
          {column.items &&
            column.items.map((item, itemIndex) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, columnIndex, itemIndex)}
                className="w-11/12 py-2 mb-1 text-center border border-gray-300 rounded-md"
              >
                <p>
                  <span className="flex justify-center">
                    <img
                      src={item.imgSrc}
                      alt="백로그_담당자_이미지"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="ml-1">{item.text}</span>
                  </span>
                </p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
