import React from 'react';
import { useQuery } from 'react-query';
import { FaCheck } from 'react-icons/fa6';
import { TEAlert } from 'tw-elements-react';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import {
  useMyFeedback,
  usePeerList,
  usePeerMain,
} from '../../store/PeerStore/store';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { getMyFeedback } from '../../apis/apiPeer';

export default function FeedbackOne() {
  const { isOpenPeerModal, setIsOpenPeerModal } = usePeerMain((state) => state);
  const { peerDatalistDto } = usePeerList((state) => state);
  const { currentProjectNumber } = useBackLogPageRes((state) => state);
  const { pjtData } = useProjectInBackLog((state) => state);
  const { myFeedbackDto, setMyFeedbackData } = useMyFeedback((state) => state);

  const { data: myFeedbackComment, isLoading: isMyFeedbackCommentLoading } =
    useQuery(
      ['myFeedbackComment', pjtData[currentProjectNumber]?.no],
      () => getMyFeedback(pjtData[currentProjectNumber]?.no),
      {
        // enabled: !!backNum,
        onSuccess: (data) => {
          setMyFeedbackData(data?.datalist);
        },
        onError: (error) => {
          console.log('error ', error);
        },
      },
    );

  return (
    <>
      <div
        onClick={() => {
          setIsOpenPeerModal();
        }}
        className="cursor-pointer bg-[white] rounded-md shadow-md text-center py-4 justify-center p-1 w-full h-1/2 mr-3 border-2 border-stone-100 hover:bg-[#F0FFF0]"
      >
        <div className="flex justify-center items-center m-3 cursor-pointer hover:scale-110">
          <p className="font-bold text-xl text-gray-700 ">지지적 피드백</p>
          <FaHeartCirclePlus className="ml-3 text-[#80E12A]" />
        </div>
      </div>
      <TEAlert
        dismiss
        // autohide
        // delay={5000}
        open={isOpenPeerModal}
        setOpen={setIsOpenPeerModal}
        className="bg-white rounded-md shadow-sm"
      >
        <div className="bg-white p-8 py-5 border border-[#80E12A] rounded-md">
          <strong className="text-lg">지지적 피드백</strong>
          <div className="scroll overflow-y-scroll scrollBar">
            {myFeedbackComment?.datalist?.map((e, idx) => (
              <p className="border-b-2 m-1 py-1 flex w-[330px]" key={idx}>
                <span className="text-[#80E12A]">
                  <FaCheck className="mr-2" />
                </span>
                <span className="item-center">{e?.comment1}</span>
              </p>
            ))}
          </div>
        </div>
      </TEAlert>

      {/* {isOpenPeerModal && <FeedBackModal />} */}
    </>
  );
}
