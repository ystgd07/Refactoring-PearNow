import BacklogBorad from './BacklogBorad';
import BacklogHeader from './BacklogHeader';

export default function BacklogList() {
  return (
    <>
      <div className="m-6">
        {/* 백로그 해더 */}
        <BacklogHeader />
        {/* 백로그 */}
        <BacklogBorad />
      </div>
    </>
  );
}
