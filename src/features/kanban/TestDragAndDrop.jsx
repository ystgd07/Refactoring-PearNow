import React, { useState, useRef } from 'react';

export default function TestDragAndDrop() {
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [list, setList] = useState([
    { id: 1, text: '111111111111', imgSrc: 'testImg.jpg' },
    { id: 2, text: '222222222222', imgSrc: 'testImg.jpg' },
    { id: 3, text: '333333333333', imgSrc: 'testImg.jpg' },
    { id: 4, text: '444444444444', imgSrc: 'testImg.jpg' },
    { id: 5, text: '555555555555', imgSrc: 'testImg.jpg' },
  ]);

  // 드래그 시작될 때 실행
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  // 드랍 (커서 뗐을 때)
  const drop = () => {
    if (dragItem.current !== dragOverItem.current) {
      const newList = [...list];
      const dragItemValue = newList[dragItem.current];
      newList.splice(dragItem.current, 1);
      newList.splice(dragOverItem.current, 0, dragItemValue);
      dragItem.current = null;
      dragOverItem.current = null;
      setList(newList);
    }
  };

  return (
    <>
      {list &&
        list.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => dragStart(e, idx)}
            onDragEnter={(e) => dragEnter(e, idx)}
            onDragEnd={drop}
          >
            <div className="w-11/12 py-2 mb-1 text-center border border-gray-300 rounded-md">
              <p>
                <span className="flex justify-center">
                  <img
                    // src="testImg.jpg"
                    src={`data:image/*;base64,${item?.image}`}
                    alt="백로그_담당자_이미지"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-1">{item.text}</span>
                </span>
              </p>
            </div>
          </div>
        ))}
    </>
  );
}
