import {
  AllBacklogOfThisPjt,
  UseBackLog,
  createBackLog,
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import ModalRadio from './ModalRadio';
import { createBackLogApi, fetchBackLogList } from '../../apis/backLogApis';
import ModalSearch from './ModalSearch';
import { useBackLogPage } from '../../store/store';
import toast from 'react-hot-toast';
export default function ModalDetail() {
  const { setBackLogModalOpen } = useBackLogPage((state) => state);

  //
  const queryClient = useQueryClient();
  // 백로그 유저 서치
  const { setSearchRes, searchUser, setSearchUser, searchRes } = UseBackLog(
    (state) => state,
  );
  // 백로그 생성
  const {
    setUserId,
    setStatus,
    setTitle,
    setDetail,
    addFileName,
    backlogDto,
    backFileDto,
  } = createBackLog((state) => state);

  // 현재 프로젝트
  const {
    currentProjectNumber,
    currentSearchUser,
    setCurrentSearcUser,
    currentBackLogMananger,
    setCurrentBackLogManager,
  } = useBackLogPageRes((state) => state);
  const { setBacklogData } = AllBacklogOfThisPjt((state) => state);
  const { pjtData } = useProjectInBackLog((state) => state);

  console.log('currentProjectNumber :', currentProjectNumber);

  const { mutate: createMutateOfBackLog, isLoading: isLoadingCreateBackLog } =
    useMutation(
      () =>
        createBackLogApi(
          backlogDto,
          backFileDto,
          pjtData[currentProjectNumber]?.no,
        ),
      {
        onSuccess: (user) => {
          console.log('Success backLog111 : ', user);
          queryClient.invalidateQueries('fetchBackLogList');
          setBackLogModalOpen();
          setStatus('todo');
          setTitle('');
          setUserId('');
          setDetail('');
          setCurrentBackLogManager('');
        },
        onError: (error) => {
          console.log('Error', error);
        },
      },
    );

  console.log('Success backLog222', createMutateOfBackLog);

  return (
    <>
      <div>
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <ModalRadio onChange={(e) => setStatus(e.target.value)} />
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 w-full  border-gray-300 p-2 mb-4 rounded-md"
            placeholder=" *무엇을 해야합니까"
            value={backlogDto.title}
          />
          <div
            type="text"
            name="user_id"
            className="border-2 w-full border-gray-300 p-2 mb-4 rounded-md"
            placeholder=" *담당자를 선택할 수 있습니다"
            onClick={setCurrentSearcUser}
          >
            {currentBackLogMananger ? (
              <div>{currentBackLogMananger}</div>
            ) : (
              <p className="text-gray-500"> *담당자를 선택할 수 있습니다 </p>
            )}
          </div>
          <ModalSearch visible={currentSearchUser} />
          <input
            type="text"
            name="detail"
            onChange={(e) => setDetail(e.target.value)}
            className="border-2 w-full border-gray-300 p-2 mb-4 rounded-md"
            placeholder="설명을 입력할 수 있습니다"
            value={backlogDto.detail}
          />
          <div className="items-center">
            <input
              type="file"
              name="name"
              onChange={(e) => {
                addFileName(e.target.files[0]);
              }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
            />
          </div>
          <div className="float-right my-2">
            <button
              className="text-right mr-1 -mb-6"
              onClick={() => {
                console.log('check file111: ', backFileDto);
                console.log('currentProjectNumber1 :', currentProjectNumber);
                createMutateOfBackLog(
                  backlogDto,
                  backFileDto,
                  currentProjectNumber,
                );
              }}
            >
              <span
                className={`text-lg bg-gray-300 p-1 px-4 rounded-md hover:bg-gray-400 `}
              >
                {isLoadingCreateBackLog ? '생성 중..' : '생성'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
