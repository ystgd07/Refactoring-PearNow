import { usePeerEv } from '../../store/PeerStore/store';
import { GiProgression } from 'react-icons/gi';
import { WiCelsius } from 'react-icons/wi';
export default function MainMyScoreBlock() {
  const { peerEvDto } = usePeerEv((state) => state);
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="m-2 ml-3 row-span-2 font-semibold text-xl text-gray-700">
          동료들이 평가한 나의 점수는
        </p>
        <div className="flex flex-row-reverse items-center">
          <div className=" flex items-center font-bold mr-5 -mt-4">
            <GiProgression className="mr-3 text-4xl text-[#93DAFF]"></GiProgression>
            <span className="text-5xl m-1">{peerEvDto.avg}</span>
            <span className="text-3xl text-gray-400">/50</span>
          </div>
        </div>
        <div className="flex h-full flex-col">
          <p className="flex ml-2 font-bold text- text-lg mb-2">
            나의 점수온도
          </p>

          <div className="w-full bg-slate-200 rounded-full ">
            <div
              className="bg-slate-400 bg-gradient-to-r h-6 from-[#FF8200] via-[#FFB400] to-[#FFDC3C] bg-300% items-center flex animate-gradient text-xs font-medium  text-blue-100 text-center p-2 leading-none rounded-full"
              style={{ width: `${(peerEvDto.avg / 50) * 100}%` }}
            >
              <p className="ml-6 text-lg">{(peerEvDto.avg / 50) * 100}</p>
              <WiCelsius className="text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
