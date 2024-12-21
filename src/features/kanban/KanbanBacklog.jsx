export default function KanbanBacklog() {
  const items = [
    { id: 1, text: '화면 설계서 작성', imgSrc: 'testImg.jpg' },
    { id: 2, text: 'API 명세서 작성', imgSrc: 'testImg.jpg' },
    { id: 3, text: '인프라 아키텍처 그리기', imgSrc: 'testImg.jpg' },
    { id: 4, text: 'Route53 도메인 연결', imgSrc: 'testImg.jpg' },
    { id: 5, text: '메인페이지 UI 작업', imgSrc: 'testImg.jpg' },
  ];

  return (
    <>
      {items?.map((item) => (
        <div className="w-11/12 py-2 mb-1 text-center border border-gray-300 rounded-md">
          <p>
            <span className="flex justify-center">
              <img
                // src="testImg.jpg"
                src={`data:image/*;base64,${item?.image}`}
                alt="백로그_담당자_이미지"
                className="w-6 h-6 rounded-full"
              />
              <span className="ml-1">{item?.text}</span>
            </span>
          </p>
        </div>
      ))}
    </>
  );
}
