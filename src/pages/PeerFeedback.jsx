import FeedbackDetail from '../features/feedback/FeedbackDetail';
import Header from '../ui/Header';

export default function PeerFeedback() {
  return (
    <>
      {/* 화면 틀 */}
      <div className="w-full">
        <Header />
        <FeedbackDetail className="h-[40rem] scroll overflow-y-scroll" />
      </div>
    </>
  );
}
