import React, { useState } from 'react';
import { TEAlert } from 'tw-elements-react';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import FeedBackModal from './FeedBackModal';
import {
  useMyFeedback,
  usePeerList,
  usePeerMain,
} from '../../store/PeerStore/store';

export default function MyFeedbackSelectPage() {
  const [open, setOpen] = useState(false);
  const { isOpenPeerModal, setIsOpenPeerModal } = usePeerMain((state) => state);
  const { peerDatalistDto } = usePeerList((state) => state);

  return (
    <div>
      <button
        type="button"
        className="cursor-pointer bg-[white] rounded-md shadow-md text-center py-4 justify-center p-1 w-full h-1/2 mr-3 border-2 border-stone-100 hover:bg-[#F0FFF0]"
        // className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-center items-center m-3 cursor-pointer hover:scale-110">
          <p className="font-bold text-lg text-gray-700 ">지지적 피드백</p>
          <FaHeartCirclePlus className="ml-3 text-[#80E12A]" />
        </div>
      </button>

      <TEAlert dismiss autohide delay={5000} open={open} setOpen={setOpen}>
        <strong>Holy guacamole!</strong>
        <span className="ml-1">
          You should check in on some of those fields below.
        </span>
      </TEAlert>
    </div>
  );
}
