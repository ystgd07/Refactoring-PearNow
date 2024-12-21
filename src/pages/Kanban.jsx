import Header from '../ui/Header';
import KanbanList from '../features/kanban/KanbanList';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../store/BackLogStore/store';
import { fetchBackLogPjtData } from '../apis/backLogApis';
import { useQuery } from 'react-query';
import { useKanbanData } from '../store/KanbanStore/sotre';
import { useEffect } from 'react';
import { PjtNumNow } from '../store/header/store';
import ContentLoader, { Instagram } from 'react-content-loader';

export default function Kanban() {
  // Header용
  const { setPjtDetailData, setPjtData } = useProjectInBackLog(
    (state) => state,
  );

  //
  const { nowNum } = PjtNumNow((state) => state);
  const { currentProjectNumber } = useBackLogPageRes((state) => state);

  const {
    data: PjtData,
    isLoading: pjtDataLoading,
    refetch,
  } = useQuery(['fechingPjtDataInB'], fetchBackLogPjtData, {
    onSuccess: (data) => {
      setPjtData(data?.data?.datalist);
    },
  });

  return (
    <>
      {/* 화면 틀 */}
      <div className="w-full h-auto">
        {!pjtDataLoading && (
          <>
            <Header />
            <KanbanList />
          </>
        )}
      </div>
    </>
  );
}
