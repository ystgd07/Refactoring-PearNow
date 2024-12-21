import React from 'react';
import { TEAlert } from 'tw-elements-react';
import { FaHeartCircleMinus } from 'react-icons/fa6';
import { useMyFeedback, usePeerMain } from '../../store/PeerStore/store';
import { FaCheck } from 'react-icons/fa6';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { useQuery } from 'react-query';
import { getMyFeedback } from '../../apis/apiPeer';

export default function FeedbackTwo() {
  const { isOpenPeerModal2, setIsOpenPeerModal2 } = usePeerMain(
    (state) => state,
  );
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
          setIsOpenPeerModal2();
        }}
        className="cursor-pointer py-4 p-1 justify-center bg-white rounded-md shadow-md text-center w-full h-1/2 border-2 border-stone-100 hover:bg-[#FFF0F5]"
      >
        <div className="flex justify-center items-center m-3 cursor-pointer hover:scale-110">
          <p className="font-bold bold text-xl text-gray-700">교정적 피드백</p>
          <FaHeartCircleMinus className="ml-3 text-[#FF5675] " />
        </div>
      </div>
      <TEAlert
        dismiss
        // autohide
        // delay={5000}
        open={isOpenPeerModal2}
        setOpen={setIsOpenPeerModal2}
        className="bg-white rounded-md shadow-sm"
      >
        <div className="bg-white p-8 py-5 border border-[#FF5675] rounded-md">
          <strong className="text-lg">교정적 피드백</strong>
          <div className="scroll overflow-y-scroll scrollBar h-[155px]">
            {myFeedbackComment?.datalist?.map((e, idx) => (
              <p className="border-b-2 m-1 py-1 flex w-[330px]" key={idx}>
                <span className="text-[#FF5675]">
                  <FaCheck className="mr-2" />
                </span>
                <span className="item-center">{e?.comment2}</span>
              </p>
            ))}
          </div>
        </div>
      </TEAlert>
      {/* {isOpenPeerModal2 && <FeedbackModalTwo />} */}
    </>
  );
}
