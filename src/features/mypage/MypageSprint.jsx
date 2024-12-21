import { useMyRole } from '../../store/UserMain/store';
import Sprints from './Sprints';
import Title from './Title';
import { Link } from 'react-router-dom';

export default function MypageSprint() {
  // 역할 권한
  const { role } = useMyRole((state) => state);
  console.log('role...my....', role);
  return (
    <>
      {/* 스프린트 sprint */}
      <div className="rounded-md w-full mt-2 bg-white p-5 overflow-y-scroll scrollBar">
        <div className="grid grid-cols-2">
          <span className="text-3xl text-gray-700 mt-3 ml-2 font-medium">
            <Title value={'스프린트'} />
          </span>
          {role === 'SM' ? (
            <span className="text-right mt-7">
              <Link to={'/home/sprint'} className="text-right">
                <button className="text-right mr-1 -mt-4 mb-1">
                  <span
                    className={`text-lg bg-amber-200 p-2 font-medium px-4 rounded-md hover:bg-amber-300`}
                  >
                    스프린트 생성
                  </span>
                </button>
              </Link>
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="">
          <Sprints />
        </div>
      </div>
    </>
  );
}
