import FeedbackDetailTitle from './FeedbackDetailTitle';
import FeedbackQuestion from './FeedbackQuestion';
import Footer from '../../ui/Footer';

export default function FeedbackDetail() {
  return (
    <>
      <div className="h-[40rem] scroll overflow-y-scroll scrollBar flex justify-center w-[98%] rounded-lg m-1 my-2 bg-white">
        <div className="">
          <FeedbackDetailTitle />
          <div className="">
            <FeedbackQuestion />
          </div>
          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
