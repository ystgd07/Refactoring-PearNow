export default function BacklogThead() {
  return (
    <>
      <tr>
        <th scope="col" className="px-6 py-3">
          백로그 이름
        </th>
        {/* <th scope="col" className="px-6 py-3">
          백로그 파일
        </th> */}
        <th scope="col" className="px-6 py-3">
          상태
        </th>
        <th scope="col" className="px-6 py-3">
          스프린트
        </th>
        <th scope="col" className="px-6 py-3">
          담당자
        </th>
        <th scope="col" className="px-2 py-3">
          삭제
        </th>
      </tr>
    </>
  );
}
