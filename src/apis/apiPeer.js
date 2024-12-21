import axios from 'axios';

export const postEvData = async (
  currentProjectNumber,
  selectPeerId,
  togetherPeerDto,
) => {
  console.log('togetherPeerDtotogetherPeerDto', togetherPeerDto);
  const res = await axios.post(
    `${process.env.REACT_APP_API_DOMAIN}/api/peer/evaluation?projectNumber=${currentProjectNumber}&peerId=${selectPeerId}`,
    togetherPeerDto,
    {
      withCredentials: true,
    },
  );
  return res;
};

// 나의 피드백
export const getMyFeedback = async (currentProjectNumber) => {
  console.log('dfdfdfdfdfdfdfdf : 나여ㄱ;ㅣ');
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/peer/feedback?projectNumber=${currentProjectNumber}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
