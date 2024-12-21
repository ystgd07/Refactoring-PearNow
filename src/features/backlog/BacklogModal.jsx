import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ModalDetail from './ModalDetail';
import { useBackLogPage } from '../../store/store';
import {
  UseBackLog,
  createBackLog,
  useBackLogPageRes,
} from '../../store/BackLogStore/store';
import BacklogResult from './BacklogResult';

export default function BacklogModal() {
  const { isBackLogModalOpen, setBackLogModalOpen } = useBackLogPage(
    (state) => state,
  );
  const { setSearchRes, searchUser, setSearchUser, searchRes } = UseBackLog(
    (state) => state,
  );
  const { setUserId, setStatus, setTitle, setDetail } = createBackLog(
    (state) => state,
  );

  const { setCurrentBackLogManager } = useBackLogPageRes((state) => state);

  // 초기화 핸들러
  const handleDialogClose = () => {
    setStatus('todo');
    setTitle('');
    setUserId('');
    setDetail('');
    setCurrentBackLogManager('');
  };
  return (
    <Transition.Root show={isBackLogModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setBackLogModalOpen(false);
          handleDialogClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative w-screen max-w-md ">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => {
                          setBackLogModalOpen();
                          setStatus('todo');
                          setTitle('');
                          setUserId('');
                          setDetail('');
                          setCurrentBackLogManager('');
                        }}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                    <Dialog.Title className="px-4 text-lg font-semibold leading-6 text-gray-900">
                      백로그 생성
                    </Dialog.Title>
                    <BacklogResult />
                    <ModalDetail />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
