import { useUserMain } from '../../store/UserMain/store';
import { ImProfile } from 'react-icons/im';
import { useRef, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/AuthStore/authStore';
import api from '../../apis/AxiosInterCeptor/apiInterCeptor';

export default function UserHeader() {
  const imgRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const { userMainData, updateUserImage, fetchUserData } = useUserMain((state) => ({
    userMainData: state.userMainData,
    updateUserImage: state.updateUserImage,
    fetchUserData: state.fetchUserData
  }));
  const { user } = useAuthStore();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (user?.id) {
          const userData = await fetchUserData(user.id);
          if (userData.imageUrl) {
            setImageUrl(userData.imageUrl);
          }
        }
      } catch (error) {
        toast.error('사용자 정보를 불러오는데 실패했습니다.');
      }
    };

    loadUserData();
  }, [fetchUserData, user?.id]);

  // 이미지 URL 갱신
  useEffect(() => {
    const refreshImageUrl = async () => {
      if (userMainData?.image) {
        try {
          // 전체 URL에서 profiles/ 이후의 부분만 추출
          const match = userMainData.image.match(/profiles\/([^?]+)/);
          if (!match) {
            console.error('이미지 경로 형식이 올바르지 않습니다:', userMainData.image);
            return;
          }

          // URL 디코딩 후 다시 인코딩하여 한글 처리
          const decodedKey = decodeURIComponent(match[1]);
          const imageKey = `profiles/${encodeURIComponent(decodedKey)}`;
          
          console.log('이미지 키 요청:', {
            originalImage: userMainData.image,
            decodedKey,
            encodedKey: imageKey
          });
            
          const response = await api.get(`/api/user/image/${imageKey}`);
          setImageUrl(response.data.url);
        } catch (error) {
          console.error('이미지 URL 갱신 실패:', error);
          console.log('실패한 이미지 정보:', {
            image: userMainData.image,
            error: error.response?.data
          });
        }
      }
    };

    refreshImageUrl();
    // 50분마다 URL 갱신 (Pre-signed URL이 1시간 유효하므로)
    const interval = setInterval(refreshImageUrl, 50 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userMainData?.image]);

  const handleImageChange = async () => {
    const file = imgRef.current.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('이미지 파일만 업로드 가능합니다.');
        return;
      }

      if (!userMainData?.id) {
        toast.error('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      try {
        const timestamp = new Date().getTime();
        const newFilename = `${timestamp}-${file.name}`;
        
        console.log('이미지 업데이트 요청 정보:', {
          userId: userMainData.id,
          fileName: newFilename,
          fileType: file.type,
          fileSize: file.size,
          userMainData: userMainData
        });
        
        const response = await updateUserImage(file, userMainData.id, newFilename);
        if (response.imageUrl) {
          setImageUrl(response.imageUrl);
        }
      } catch (error) {
        console.error('이미지 업데이트 중 오류 발생:', {
          error: error.response || error,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
        
        if (error.response?.status === 404) {
          toast.error('이미지 업로드 경로를 찾을 수 없습니다.');
        } else {
          toast.error('이미지 업로드에 실패했습니다.');
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <ImProfile className="text-3xl" />
        <p className="text-xl font-bold">프로필 사진</p>
      </div>

      <div className="w-full bg-white border-2 border-collapse rounded-md shadow-lg border-slate-200 h-Profile">
        <div className="relative w-full h-3/5 bg-gradient-to-r from-peerColor to-slate-50">
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={handleImageChange}
            className="hidden"
          />
          
          <div className="absolute bottom-0 left-16 transform translate-y-1/2">
            <div 
              className="w-32 h-32 rounded-full border-4 border-white overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => imgRef.current.click()}
            >
              <img
                src={imageUrl || '/peerNow.png'}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
