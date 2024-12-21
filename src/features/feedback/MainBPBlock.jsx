import { FaCrown } from 'react-icons/fa';
import { usePeerEv } from '../../store/PeerStore/store';

export default function MainBPBlock() {
  const { setPeerEvDto, peerEvDto } = usePeerEv((state) => state);
  return (
    <>
      <div className="flex flex-row items-center justify-center text-center p-1">
        <div className="flex items-center ml-4 mb-3">
          <FaCrown className="mt-3 font-bold text-3xl text-[#FFBE0A]"></FaCrown>
          <p className="ml-3 text-xl font-semibold mt-5 mr-6 items-center text-gray-700">
            최고의 동료
          </p>
        </div>
        <div className="text-right flex justify-center items-center mt-3">
          {peerEvDto.best_name == null ? (
            <div className="items-center -mt-1 text-gray-500">
              동료 평가 완료 후 공개 됩니다 !
            </div>
          ) : (
            <div className="flex flex-row">
              <img
                src={`data:image/*;base64,${peerEvDto.best_image}`}
                alt="최고의동료_이미지"
                className="text-sm mr-2 w-9 h-9 rounded-full"
              />
              <span className="text-3xl font-semibold items-center text-gray-800">
                {peerEvDto.best_name}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
