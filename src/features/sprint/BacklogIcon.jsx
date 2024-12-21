import { AllBacklogOfThisPjt } from '../../store/BackLogStore/store';
import { createSprint } from '../../store/SprintStore/store';

export default function BacklogIcon() {
  const { backlogDto, setRemoveBackLog } = createSprint((state) => state);
  const { backlogData } = AllBacklogOfThisPjt((state) => state);
  // 초기 선택 상태를 설정
  console.log('내가 선택한 백로그를 보여드리겠습니다요! : ', backlogDto);
  const handleBacklogClick = (item) => {
    // setBacklogs(item.no);
    setRemoveBackLog(item.no);
  };

  // 스프린트 번호가 없는 백로그
  const filteredBacklogs = backlogData.filter((item) => item.sprint_no === 0);

  console.log('backlogDto : ', backlogDto);
  return (
    <>
      {filteredBacklogs.map((item, idx) => (
        <div
          key={idx}
          className={`w-11/12 py-2 mb-1 text-center border border-gray-300 rounded-md cursor-pointer ${
            backlogDto.length !== 0 && backlogDto?.includes(item.no)
              ? 'bg-yellow-300 border-yellow-300 text-white font-semibold'
              : ''
          }`}
          onClick={() => handleBacklogClick(item)}
        >
          <p>
            <span className="flex justify-center">
              <img
                // src={item.image}
                src={`data:image/*;base64,${item?.image}`}
                alt="백로그_담당자_이미지"
                className="w-6 h-6 rounded-full"
              />
              <span className="ml-1">{item.title}</span>
            </span>
          </p>
        </div>
      ))}
    </>
  );
}
