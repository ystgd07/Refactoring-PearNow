import { useNavigate } from 'react-router-dom';
import PeerName from './PeerName';
import ScoreRadio from './ScoreRadio';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { postEvData } from '../../apis/apiPeer';
import ScoreRadio2 from './ScoreRadio2';
import {
  usePeerEv,
  usePeerList,
  useTogetherPeerEv,
} from '../../store/PeerStore/store';

export default function FeedbackQuestion() {
  const {
    selectPeerId,
    setSelectedScore1,
    setSelectedScore2,
    setSelectedScore3,
    setSelectedScore4,
    setSelectedScore5,
    setComment1,
    setComment2,
    togetherPeerDto,
  } = useTogetherPeerEv((state) => state);

  const { peer_id, peerDatalistDto } = usePeerList((state) => state);
  console.log('gldrnfl:::peerDatalistDto', peerDatalistDto.peer_id);

  console.log(
    'FeedbackQuestion: score1, score2, comment1, togetherPeerDto :',
    togetherPeerDto,
  );
  const queryClient = useQueryClient();
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { pjtData } = useProjectInBackLog((state) => state);
  const navigate = useNavigate();

  console.log('selectPeerIdselectPeerId :', peerDatalistDto.peer_id);
  const { mutate: postPeerEvData, isLoading: isLodingPostPeerEvData } =
    useMutation(
      ({ currentProjectNumber, peerDatalistDto, togetherPeerDto }) =>
        postEvData(
          pjtData[currentProjectNumber].no,
          peerDatalistDto.peer_id,
          togetherPeerDto,
        ),
      {
        onSuccess: (user) => {
          console.log('postPeerEvData : ', user);
          // queryClient.invalidateQueries();
          setSelectedScore1('');
          setSelectedScore2('');
          setSelectedScore3('');
          setSelectedScore4('');
          setSelectedScore5('');
          setComment1('');
          setComment2('');
          navigate('/home/feedback');
        },
        onError: (error) => {
          console.log('Error', error);
        },
      },
    );

  return (
    <>
      <div className="border-gray-200 rounded-md border-2 -mt-5 mx-5">
        <div className="grid grid-cols-4 mt-3">
          <div className="col-span-1 items-center text-center my-auto ml-4">
            <div className="bg-amber-100 p-2 mx-3 rounded-3xl">
              <span className="">평가할 동료 : </span>
              <span className="mt-6 text-3xl font-bold ml-2 text-gray-800 text-center items-center">
                {peerDatalistDto.peer_name}
              </span>
              <span></span>
            </div>
            <div className="my-5 flex justify-center">
              <div>
                <img
                  src={peerDatalistDto.peer_image}
                  alt="평가할_동료_이미지"
                  className="w-40 h-40 text-center items-center"
                />
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-2">
              @ {peerDatalistDto.peer_id}
            </p>
          </div>
          <div className="col-span-3 w-full mt-1 ml-2">
            <div className="m-2 mx-5 text-lg">
              <div className="m-2 mb-5">
                <span className="text-gray-500 text-2xl mr-2">1.</span>
                <span className="mb-1 font-semibold">
                  동료는 자신이 맡은 일을 잘 수행하였나요?
                </span>
                <p className="mt-1">
                  <ScoreRadio2 name={'score1'} value={togetherPeerDto.score1} />
                </p>
              </div>
              <div className="m-2 mb-5">
                <span className="text-gray-500 text-2xl mr-2">2.</span>
                <span className="mb-1 font-semibold">
                  동료는 기간 및 일정을 잘 지켰나요?
                </span>
                <p className="mt-1">
                  <ScoreRadio2 name={'score2'} value={togetherPeerDto.score2} />
                </p>
              </div>

              <div className="m-2 mb-5">
                <span className="text-gray-500 text-2xl mr-2">3.</span>
                <span className="mb-1 font-semibold">
                  동료의 프로젝트 기여도는 얼마인가요?
                </span>
                <p className="mt-1">
                  <ScoreRadio2 name={'score3'} value={togetherPeerDto.score3} />
                </p>
              </div>

              <div className="m-2 mb-5">
                <span className="text-gray-500 text-2xl mr-2">4.</span>
                <span className="mb-1 font-semibold">
                  동료와 커뮤니케이션이 잘 되었나요?
                </span>
                <p className="mt-1">
                  <ScoreRadio2 name={'score4'} value={togetherPeerDto.score4} />
                </p>
              </div>
              <div className="m-2 mb-5">
                <span className="text-gray-500 text-2xl mr-2">5.</span>
                <span className="mb-1 font-semibold">
                  다음에도 이 동료와 함께 하고싶나요?
                </span>
                <p className="mt-1">
                  <ScoreRadio2 name={'score5'} value={togetherPeerDto.score5} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="m-2 mx-5">
          <p className="m-5">
            <input
              type="text"
              placeholder=" * 프로젝트를 진행하며 동료의 잘한 점을 칭찬해주세요!"
              className="border-gray-200 border-2 rounded-md w-full m-1 py-4 mb-4"
              value={togetherPeerDto.comment1}
              onChange={(e) => {
                setComment1(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder=" * 동료가 더 보안했으면 하는 점이 있다면 알려주세요!"
              className="border-gray-200 border-2  rounded-md w-full m-1 py-4"
              value={togetherPeerDto.comment2}
              onChange={(e) => {
                setComment2(e.target.value);
              }}
            />
          </p>
          <div className="mb-5 text-right mr-4 -mt-2">
            <button
              class="bg-[#f7cc10] text-white text-2xl font-semibold px-5 py-1.5 rounded hover:bg-[#e6bc02]"
              onClick={() => {
                postPeerEvData({
                  currentProjectNumber,
                  peerDatalistDto,
                  togetherPeerDto,
                });
              }}
            >
              <span>{isLodingPostPeerEvData ? '제출 중 ..' : '제출'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
