import { log } from 'debug/src/browser';
import { AllBacklogOfThisPjt } from '../../store/BackLogStore/store';
import BacklogIcon from './BacklogIcon';
import MypageBackLogTitle from './MypageBackLogTitle';

export default function MypageBacklog() {
  const { backlogData, setBacklogData } = AllBacklogOfThisPjt((state) => state);
  // 진행중인 상태의 백로그
  const filteredBacklogs = backlogData.filter((item) => item.status === 'ing');
  const inProgressBacklogCount = filteredBacklogs.length;

  console.log('진행중인백로그:전체:', backlogData);
  console.log('진행중인백로그:backlogData.status:', backlogData.status);
  console.log('진행중인백로그:ing:', filteredBacklogs);
  console.log('진행중인백로그:개수:', inProgressBacklogCount);

  return (
    <>
      {/* 진행중인 백로그 back log */}
      <div className="mt-1 scrollBar bg-white h-72 rounded-lg p-3 overflow-y-scroll scrollbar-thumb-black scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-slate-100">
        <div>
          <MypageBackLogTitle />
        </div>
        {inProgressBacklogCount !== 0 ? (
          <div className="grid grid-cols-2 gap-4 mt-5 mx-3">
            <BacklogIcon />
          </div>
        ) : (
          <div className="border m-1 rounded-lg row-span-2 mt-6 mx-4 py-12">
            <div className="text-center p-10">백로그를 생성해주세요</div>
          </div>
        )}
      </div>
    </>
  );
}
