import React, { useRef } from 'react';
import { useImage, useUserMain } from '../../store/UserMain/store';
import { ImProfile } from 'react-icons/im';
import { IoInformationCircleSharp } from 'react-icons/io';
import { useMutation } from 'react-query';
import { updateUserImg } from '../../apis/apiUserData';

export default function UserHeader() {
  const { userMainData, setIsOpenDropdown, headerUserImg } = useUserMain(
    (state) => state,
  );
  const { setUserImg, stateImageData } = useImage((state) => state);

  const imgRef = useRef();

  console.log('userMainData.imageuserMainData.image :', userMainData.image);

  const { mutate: createUpdateUserImg, isLoading: isCreateBackLog } =
    useMutation(({ file, id, filename }) => updateUserImg(file, id, filename), {
      onSuccess: (user) => {
        console.log('Success createUpdateUserImg : ', user);
      },
      onError: (error) => {
        console.log('Error createUpdateUserImg', error);
      },
    });

  console.log('stateImageData:', stateImageData);
  console.log('userMainData.image', userMainData.image);
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <ImProfile className="text-3xl" />
        <p className="text-xl font-bold">프로필 사진</p>
      </div>
      <div className="w-full bg-white border-2 border-collapse rounded-md shadow-lg border-slate-200 h-Profile">
        <div className="relative w-full h-3/5 bg-gradient-to-r from-peerColor to-slate-50">
          {/* */}
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={() => {
              console.log('img change!!', imgRef.current.files[0]);
              const file = imgRef.current.files[0];
              console.log('imgfile', file);
              const reader = new FileReader();
              const readAsURL = reader.readAsDataURL(file);
              console.log('readAsDataURL : ', readAsURL);
              createUpdateUserImg({
                file,
                id: userMainData.id,
                filename: userMainData.image, //기존 파일의 filename ^^^^^^^^^
              });

              reader.onloadend = () => {
                setUserImg(reader.result);
              };
            }}
            className="absolute z-20 h-24 opacity-0 top-2/3 left-2"
          />

          <img
            className="absolute z-10 object-cover w-24 h-24 border-2 border-white rounded-full cursor-pointer top-1/3 left-10"
            src={`${
              stateImageData.userImg === ''
                ? 'data:image/*;base64,' + headerUserImg
                : stateImageData.userImg
            }`}
          ></img>
        </div>
        <div className="flex flex-row-reverse p-3">
          <div className="flex flex-row items-center mt-3">
            <p className="mr-3 text-lg font-bold">
              {userMainData.name.toUpperCase()}
            </p>
            <p className="text-sm font-semibold">({userMainData.mail})</p>
          </div>
        </div>
      </div>
    </>
  );
}
