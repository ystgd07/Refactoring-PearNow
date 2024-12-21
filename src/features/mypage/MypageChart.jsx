import { AllThisSprints } from '../../store/SprintStore/store';
import ChartGeneral from './ChartGeneral';
import Title from './Title';
import { GiEntryDoor } from 'react-icons/gi';
import { Link } from 'react-router-dom';
// import ChartPlus from './ChartPlus';

export default function MypageChart() {
  const { datalist } = AllThisSprints((state) => state);

  return (
    <>
      {/* 번다운 차트 burndown-chart */}
      <div className="bg-white rounded-lg p-3 h-72 mt-1">
        <div className="flex items-center justify-between">
          <span className="text-xl text-gray-700 m-1 font-medium">
            <Title value={'번다운 차트'} />
          </span>
          <Link to={'/home/burndown'}>
            {/* <GiEntryDoor className="text-xl cursor-pointer hover:scale-125 text-slate-600"></GiEntryDoor> */}
            <a className="float-right px-4 text-xl font-bold text-gray-500">
              &rarr;
            </a>
          </Link>
        </div>
        {datalist ? (
          <div className="h-52">
            <ChartGeneral />
          </div>
        ) : (
          <div className="h-52 border rounded-lg m-4">
            <div className="text-center p-24">
              생성할 번다운 차트가 없습니다
            </div>
          </div>
        )}
      </div>
    </>
  );
}
