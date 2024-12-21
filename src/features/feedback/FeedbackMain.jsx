import { useQuery } from 'react-query';
import MainBPBlock from './MainBPBlock';
import MainMyFBBlock from './MainMyFBBlock';
import MainMyScoreBlock from './MainMyScoreBlock';
import MainPeerBlock from './MainPeerBlock';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import axios from 'axios';
import { usePeerEv } from '../../store/PeerStore/store';
import MyFeedback from './MyFeedback';
import Footer from '../../ui/Footer';

export default function FeedbackMain() {
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { setPeerEvDto } = usePeerEv((state) => state);
  const { pjtData } = useProjectInBackLog((state) => state);
  console.log(
    'pjtData[currentProjectNumber].no:',
    pjtData[currentProjectNumber].no,
  );
  const { data: feedBackList, isLoading } = useQuery(
    ['feedBackList', pjtData[currentProjectNumber].no],
    async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/peer?projectNumber=${pjtData[currentProjectNumber].no}`,
        {
          withCredentials: true,
        },
      );
      return res;
    },
    {
      onSuccess: (data) => {
        console.log('projectNumber log : ', data?.data?.data);
        setPeerEvDto(data?.data?.data);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
      refetchOnWindowFocus: false,
    },
  );
  console.log('feedBackList : ', feedBackList);
  console.log('currentPage : ', currentProjectNumber);

  return (
    <>
      <div>
        <div className="h-[40rem] scroll overflow-y-scroll scrollBar">
          <div className="flex flex-col gap-4 m-5 mt-5">
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="w-3/5 p-3 bg-white border-2 rounded-lg shadow-md border-stone-100">
                <MainMyScoreBlock />
              </div>
              <div className="w-2/5 h-full">
                <div className="">
                  {/* 피드백 덩어리들 */}
                  <MyFeedback />
                </div>
                <div className="w-full p-3 mt-2 bg-white border-2 rounded-md shadow-md h-1/2 border-stone-100">
                  <MainBPBlock />
                </div>
              </div>
            </div>
            <div className="h-auto p-3 mt-2 mb-6 bg-white border-2 rounded-md shadow-lg border-stone-100">
              <MainPeerBlock />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
