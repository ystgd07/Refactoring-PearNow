import React from 'react';

export default function MyFeedbackDetail1() {
  const items = [
    {
      name: '멋집니다',
    },
    {
      name: '잘합니다',
    },
    {
      name: '죠습니다',
    },
  ];

  return (
    <div>
      <div>😊</div>
      <div className="bg-white rounded-md mt-5">
        {items.map((item, index) => (
          <div className="text-center text-base m-3">
            <ul>
              <li className="font-semibold">{item.name}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
