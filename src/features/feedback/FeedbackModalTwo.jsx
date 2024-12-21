import React from 'react';
import { useMyFeedback, usePeerMain } from '../../store/PeerStore/store';
import { FaCheck } from 'react-icons/fa6';
import {
  useBackLogPageRes,
  useProjectInBackLog,
} from '../../store/BackLogStore/store';
import { useQuery } from 'react-query';
import { getMyFeedback } from '../../apis/apiPeer';

export default function FeedBackModalTwo() {
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
  console.log('myFeedbackDtomyFeedbackDto111 :', myFeedbackComment);
  console.log('myFeedbackDtomyFeedbackDto222 :', myFeedbackDto);

  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full backdrop-blur-md`}
        // h-[calc(100%-1rem)]
      >
        <div className="relative w-full max-w-md max-h-full top-1/4 left-1/3">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={setIsOpenPeerModal2}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="h-auto p-4">
              <div className="text-gray-700">
                <div className="text-center text-2xl font-bold">
                  교정적 피드백
                </div>
                <div className="mt-5">
                  {myFeedbackComment?.datalist?.map((e, idx) => (
                    <p className="border-b-2 m-1 py-1 flex" key={idx}>
                      {/* <span className="text-[#80E12A]">
                        <FaCheck className="mr-2" />
                      </span>
                      <span className="item-center">{e?.comment1}</span> */}
                      <span className="text-[#FF5675]">
                        <FaCheck className="mr-2" />
                      </span>
                      <span className="item-center">{e?.comment2}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
