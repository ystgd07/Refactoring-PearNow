import { useUserMain } from '../../store/UserMain/store';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';

export default function UserUpdateModal() {
  const {
    setIsOpenUpdateModal,
    userMainData,
    modalState,
    updateTeam,
    updatePhone,
    updateMail,
    setUpdateMail,
    setUpdatePhone,
    setUpdateTeam,
    updateUserData
  } = useUserMain((state) => state);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userMemberDto: {
        name: userMainData.name,
        image: userMainData.image,
        mail: userMainData.mail,
        phone: userMainData.phone,
        team: userMainData.team,
      },
    },
  });

  const { mutate: updateUser, isLoading } = useMutation(
    (data) => updateUserData(data, userMainData?.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userData', userMainData?.id]);
        setIsOpenUpdateModal();
      }
    }
  );

  const placeholderStatus =
    modalState === '이메일'
      ? userMainData.mail
      : modalState === '전화번호'
      ? userMainData.phone
      : userMainData.team;

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md"
    >
      <div className="relative w-full max-w-md max-h-full top-1/4 left-1/3">
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={setIsOpenUpdateModal}
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <form
            onSubmit={handleSubmit((data) => {
              updateUser(data);
            })}
            className="px-6 py-6 lg:px-8"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {modalState} 수정
            </h2>

            {modalState === '이메일' ? (
              <input
                {...register('userMemberDto.mail', {
                  required: '이메일은 필수 입력사항입니다.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '유효한 이메일 주소를 입력해주세요.',
                  },
                })}
                type="email"
                placeholder={placeholderStatus}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUpdateMail(e.target.value)}
                value={updateMail}
              />
            ) : modalState === '전화번호' ? (
              <input
                {...register('userMemberDto.phone', {
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: '올바른 전화번호 형식을 입력해주세요.',
                  },
                })}
                type="tel"
                placeholder={placeholderStatus}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUpdatePhone(e.target.value)}
                value={updatePhone}
              />
            ) : (
              <input
                {...register('userMemberDto.team')}
                type="text"
                placeholder={placeholderStatus}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUpdateTeam(e.target.value)}
                value={updateTeam}
              />
            )}

            {errors?.userMemberDto?.[modalState === '이메일' ? 'mail' : modalState === '전화번호' ? 'phone' : 'team'] && (
              <p className="mt-1 text-sm text-red-500">
                {errors.userMemberDto[modalState === '이메일' ? 'mail' : modalState === '전화번호' ? 'phone' : 'team'].message}
              </p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? '업데이트 중...' : '저장'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
