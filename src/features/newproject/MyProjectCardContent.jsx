import React from 'react';

export default function MyProjectCardContent({ content }) {
  return (
    <div className="text-sm text-gray-600">
      <p className="line-clamp-2">{content}</p>
    </div>
  );
}
