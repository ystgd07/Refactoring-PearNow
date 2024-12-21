import { usePeerList } from '../../store/PeerStore/store';

export default function PeerName() {
  const { peerDatalistDto } = usePeerList((state) => state);

  return (
    <>
      <div className="">
        <span className="flex">
          <img
            // src={`data:image/*;base64,${peer_image}`}
            src={peerDatalistDto.peer_image}
            alt="평가할_동료_이미지"
            className="w-12 h-12 rounded-full mr-1"
          />
          <span className="ml-3 text-2xl font-semibold mt-1.5 items-center">
            {peerDatalistDto.peer_name}{' '}
            <span className="text-lg text-gray-600">님</span>
          </span>
        </span>
      </div>
    </>
  );
}
