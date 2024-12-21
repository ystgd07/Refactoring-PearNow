import { format } from 'date-fns';
import React from 'react';

export default function MyProjectCardFooter({ strDate, endDate }) {
  return (
    <div className="flex flex-col w-1/5 h-full ml-2 ">
      <div>
        <p className="flex flex-row-reverse text-xs font-bold text-green-500 text-gray">
          {format(new Date(strDate), 'yyyy-MM-dd')}
        </p>
      </div>
      <div>
        <p className="flex flex-row-reverse text-xs font-bold text-red-500 text-gray">
          {format(new Date(endDate), 'yyyy-MM-dd')}
        </p>
      </div>
    </div>
  );
}
