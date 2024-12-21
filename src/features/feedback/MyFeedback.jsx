import React from 'react';
import FeedbackOne from './FeedbackOne';
import FeedbackTwo from './FeedbackTwo';

export default function MyFeedback() {
  return (
    <>
      <div className="flex flex-row mb-4 mt-1">
        {/* 지지적 피드백 */}
        <FeedbackOne />
        {/* 교정적 피드백 */}
        <FeedbackTwo />
      </div>
    </>
  );
}
