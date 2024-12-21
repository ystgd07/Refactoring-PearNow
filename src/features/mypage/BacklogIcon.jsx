import { fetchBackLogList } from '../../apis/backLogApis';
import {
  AllBacklogOfThisPjt,
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';

export default function BacklogIcon() {
  // backlogData
  const { pjtData } = useProjectInBackLog((state) => state);
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { backlogData, setBacklogData } = AllBacklogOfThisPjt((state) => state);
  // 진행중인 상태의 백로그
  const filteredBacklogs = backlogData.filter((item) => item.status === 'ing');
  const inProgressBacklogCount = filteredBacklogs.length;

  const {
    data: bgDataInDashBoard,
    isLoading: bDataLoading,
    // refetch: Backlogs,
  } = useQuery(
    ['fetchBackLogList', pjtData[currentProjectNumber].no],
    () => fetchBackLogList(pjtData[currentProjectNumber].no),
    {
      onSuccess: (data) => {
        toast.success('백로그를 불러왔습니다.');
        console.log('fetchBackLogList :', data);
        setBacklogData(data?.data?.datalist);
      },
    },
  );

  return (
    <>
      {filteredBacklogs.map((item, index) => (
        <p
          key={index}
          className="py-2 text-center border border-gray-300 rounded-md"
        >
          <div className="flex justify-center">
            <span className="">
              <img
                // src={item.image}
                src={`data:image/*;base64,${item?.image}`}
                alt={`백로그_담당자_이미지_${index}`}
                className="w-6 h-6 rounded-full"
              />
            </span>
            <span className="ml-1">{item.title}</span>
          </div>
        </p>
      ))}
    </>
  );
}
