import { fetchBackLogPjtData } from '../apis/backLogApis';
import FeedbackMain from '../features/feedback/FeedbackMain';
import { useProjectInBackLog } from '../store/BackLogStore/store';
import Footer from '../ui/Footer';
import Header from '../ui/Header';
import { useQuery } from 'react-query';

export default function Feedback() {
  // Header용
  const { setPjtDetailData, setPjtData } = useProjectInBackLog(
    (state) => state,
  );
  const { data: PjtData, isLoading: pjtDataLoading } = useQuery(
    ['fechingPjtDataInB'],
    fetchBackLogPjtData,
    {
      onSuccess: (data) => {
        console.log('fetchBackLogPjtDatadata :', data);
        setPjtData(data?.data?.datalist);
      },
    },
  );

  return (
    <>
      {/* 화면 틀 */}
      <div className="w-full">
        <Header />
        <div className="w-[98%] m-1 mt-3 bg-white rounded-md">
          <FeedbackMain />
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
