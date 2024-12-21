import React from 'react';

export default function MyProjectCardContent({ content }) {
  return (
    <div className="w-2/5">
      <p className="truncate">{content}</p>
    </div>
  );
}
