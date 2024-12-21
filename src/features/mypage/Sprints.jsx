import { fetchAllSprints } from '../../apis/sprintApis';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import {
  AllThisSprints,
  useSelectedSprint,
} from '../../store/SprintStore/store';
import { PjtNumNow } from '../../store/header/store';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Sprints() {
  const { nowNum } = PjtNumNow((state) => state);
  const { datalist, setDatalist, recentDate, setRecentDate } = AllThisSprints(
    (state) => state,
  );
  const { pjtData } = useProjectInBackLog((state) => state);
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { setSprintNo, setProjectNo, setSprintTitle, setSelectedValidate } =
    useSelectedSprint((state) => state);

  const { data: allSprintData, isLoading: isAllSprintData } = useQuery(
    ['fetchAllSprints', pjtData[currentProjectNumber]?.no],
    () => fetchAllSprints(pjtData[currentProjectNumber]?.no),
    {
      onSuccess: (data) => {
        console.log('fetchAllSprints :', data);
        setDatalist(data?.data?.datalist);
        setRecentDate();
      },
    },
  );

  return (
    <>
      {datalist ? (
        <Link to={`/home/kanban`}>
          <div className="gap-4 mt-3">
            <div className="grid grid-cols-4 gap-4">
              {datalist?.map((item, idx) => {
                const startDate = item?.start_date.split(' ')[0];
                const endDate = item?.end_date.split(' ')[0];
                return (
                  <div
                    key={idx}
                    // className="p-4 transition-transform transform border rounded-lg shadow-md hover:scale-105"
                    className="p-4 transition-transform transform border rounded-lg hover:scale-105"
                    onClick={() => {
                      setProjectNo(item?.project_no);
                      setSprintNo(item?.no);
                      setSprintTitle(item?.title);
                      // setSelectedValidate();
                    }}
                  >
                    <div className="mb-2 text-xl font-semibold">
                      <span className="text-gray-400">{idx + 1} </span>{' '}
                      {item?.title}
                    </div>
                    <div className="mb-4 text-xs text-left text-gray-500">
                      {startDate} ~ {endDate}
                    </div>
                    <button className="px-3 text-white bg-[#f7cc10] rounded-full float-right focus:outline-none focus:shadow-outline-blue">
                      이동
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      ) : (
        <div className="border m-1 mt-6 rounded-lg">
          <div className="text-center p-5">스프린트를 생성해주세요</div>
        </div>
      )}
    </>
  );
}
