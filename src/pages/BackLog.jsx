import Header from '../ui/Header';
import { useBackLogPage } from '../store/store';
import BacklogList from '../features/backlog/BacklogList';
import BacklogModal from '../features/backlog/BacklogModal';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../store/BackLogStore/store';
import { useQuery } from 'react-query';
import { fetchBackLogPjtData } from '../apis/backLogApis';
import axios from 'axios';
import Footer from '../ui/Footer';

export default function BackLog() {
  const { isBackLogModalOpen } = useBackLogPage((state) => state);
  const { setPjtDetailData, setPjtData, pjtData } = useProjectInBackLog(
    (state) => state,
  );
  const { currentProjectNumber, currentProjectData } = useBackLogPageRes(
    (state) => state,
  );

  //  user_id
  const { data: PjtData, isLoading: pjtDataLoading } = useQuery(
    ['fechingPjtDataInB'],
    fetchBackLogPjtData,
    {
      onSuccess: (data) => {
        console.log('data PjtData :', data);
        setPjtData(data.data.datalist);
      },
    },
  );

  const { data: PjtDetailData, isLoading: pjtDetailDataLoading } = useQuery(
    ['fechingPjtDetailDataInB', pjtData[currentProjectNumber].no],
    async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/project/peerlist?projectNumber=${pjtData[currentProjectNumber].no}`,
        {
          withCredentials: true,
        },
      );

      return res;
    },
    {
      enabled: !!PjtData,

      onSuccess: (data) => {
        console.log('data2 :', data);
        setPjtDetailData(data?.data?.datalist);
      },
    },
  );

  return (
    <>
      {/* 화면 틀 */}
      <div className="w-full h-auto">
        <Header />
        {/* 2 currentPjtNum이 변경되면 BackLogList를 재랜더링 */}
        <div className="w-[98%] rounded-lg m-1 my-2 bg-white">
          <div className="p-3">
            <BacklogList />
            {isBackLogModalOpen && <BacklogModal />}
          </div>
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
