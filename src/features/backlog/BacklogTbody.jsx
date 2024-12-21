import { MdDelete } from 'react-icons/md';
import BacklogStatus from './BacklogStatus';
import BacklogSprint from './BacklogSprint';
import {
  AllBacklogOfThisPjt,
  useBackLogPageRes,
  useBackNumStore,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { FcDownload } from 'react-icons/fc';
import {
  deleteBacklog,
  downloadBackLogFile,
  fetchBackLogList,
} from '../../apis/backLogApis';
import { useMutation, useQuery } from 'react-query';
import { useBackLogDetailPage } from '../../store/store';
import BacklogDetailModal from './BacklogDetailModal';
import toast from 'react-hot-toast';

export default function BacklogTbody() {
  // 전체 백로그 확인
  const { backlogData, setBacklogData } = AllBacklogOfThisPjt((state) => state);
  console.log('[BacklogTbody] 전체 백로그 확인, backlogData', backlogData);
  // 프로젝트 번호
  const { pjtData } = useProjectInBackLog((state) => state);
  console.log('[BacklogTbody] 프로젝트 번호, pjtData', pjtData);
  // 헤더 프로젝트 번호
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  // 백로그 상세페이지 모달
  const { isBackLogModalOpen, setBackLogModalOpen } = useBackLogDetailPage(
    (state) => state,
  );
  //
  const { backNum, setBackNum, setSelectedBackObj } = useBackNumStore(
    (state) => state,
  );
  //

  console.log('[BacklogTbody] nowNum 번호 ====> ', currentProjectNumber);
  console.log('[BacklogTbody] backlogData.no 번호 ====> ', backlogData.no);

  // 백로그 데이터 받아오기
  const {
    data: bData,
    isLoading: bDataLoading,
    refetch: Backlogs,
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

  // 백로그 삭제
  const { mutate: deleteBacklog, isLoading: isDeleteBacklogLoading } =
    useMutation((backNum) => deleteBacklog(backNum), {
      onSuccess: (data) => {
        console.log('deleteBacklog111');
        console.log('deleteBacklog222 :', data);
        setBacklogData(data?.data?.datalist);
        Backlogs();
      },
      onError: (error) => {
        console.log('Error', error);
      },
    });

  // 백로그 이미지 다운로드
  const { mutate: downLoadBackLogFile, isLoading } = useMutation(
    (backlogData) => downloadBackLogFile(backlogData),
    {
      onSuccess: (data) => {
        console.log('dataDownLoad:', data.headers['content-disposition'], data);
        // data.blob();
        const blobData = new Blob([data.data]);
        const url = window.URL.createObjectURL(blobData);

        const link = document.createElement('a');
        link.href = url;
        link.style.display = 'none';

        const disposition = data.headers['content-disposition'];
        console.log('disposition1', disposition);

        const fileName = decodeURI(
          disposition
            .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
            .replace(/['"]/g, ''),
        );
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.remove();

        // window.URL.revokeObjectURL(url);

        // console.log('downLoad', data);
      },
    },
  );

  return (
    <>
      {isBackLogModalOpen && <BacklogDetailModal />}
      {backlogData.map((item, idx) => (
        <tr key={idx} className="bg-white border-b">
          <th
            scope="row"
            className="flex flex-row py-2 pl-6 font-medium text-gray-900 whitespace-nowrap"
          >
            <button
              className="font-medium cursor-pointer hover:text-blue-600"
              onClick={() => {
                setBackLogModalOpen();
                setBackNum(item.no);
                setSelectedBackObj(item);
              }}
              value={item.title}
            >
              {item.title}
            </button>
            {backlogData?.image !== null ? (
              <button
                className="ml-2"
                onClick={() => downLoadBackLogFile(backlogData[idx])}
              >
                <FcDownload />
              </button>
            ) : (
              ''
            )}
          </th>
          {/* <th className="py-2"></th> */}
          <td className="px-6 py-2">
            <BacklogStatus
              value={
                item.status === 'todo'
                  ? '● 진행 예정 '
                  : item.status === 'ing'
                  ? '● 진행 중'
                  : '● 완료'
              }
              color={
                item.status === 'todo'
                  ? 'red'
                  : item.status === 'ing'
                  ? 'blue'
                  : 'green'
              }
            />
          </td>
          <td className="px-6 py-2">
            <BacklogSprint
              value={item.sprint_no === 0 ? '-' : item.sprint_no}
            />
          </td>
          <td className="px-4 py-2">
            <span className="flex">
              <img
                // src={item.image}
                src={`data:image/*;base64,${item.image}`}
                className="w-6 h-6 rounded-full"
                alt="백로그_담당자_이미지"
              />
              <span className="ml-1">{item.user_id}</span>
            </span>
          </td>
          <td className="px-2 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // e.stopImmediatePropagation();
                if (!isDeleteBacklogLoading) {
                  deleteBacklog(item.no);
                }
              }}
              className="text-xl font-medium text-gray-400 hover:text-red-600"
            >
              <MdDelete />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
