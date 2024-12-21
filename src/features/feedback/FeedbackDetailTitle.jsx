import { TiArrowBackOutline } from 'react-icons/ti';
import { useTogetherPeerEv } from '../../store/PeerStore/store';

export default function FeedbackDetailTitle() {
  const { setComment1, setComment2 } = useTogetherPeerEv((state) => state);

  return (
    <>
      <div className="flex flex-row m-9 mb-8">
        <div className="mr-44">
          <h1 className="text-4xl font-bold text-slate-800">동료평가</h1>
          <p className="m-1 text-slate-500 text-lg">
            모든 동료평가는 익명으로 진행되니 솔직한 답변 부탁드립니다!
          </p>
        </div>
        <div className="ml-auto mt-11 mr-3 hover:scale-110 text-gray-700 text-xl">
          <a
            href="javascript:window.history.back();"
            onClick={() => {
              setComment1('');
              setComment2('');
            }}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <p className="font-bold">뒤로가기</p>
            <TiArrowBackOutline className="w-7 h-7 " />
          </a>
        </div>
      </div>
    </>
  );
}
