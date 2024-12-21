import axios from 'axios';
import { response } from 'express';
import { getCookie, setCookie } from '../../Cookies/cookie';

// export const privateApi = axios.create({
//   baseURL: '',
// });

// export async function postRefreshToken() {
//   const response = await publicApi.post('/api/user/request_refreshToken', {
//     refreshToken: getCookie('refreshToken'),
//   });
//   return response;
// }

// privateApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },

//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     //토큰이 만료되을 때
//     if (status === 401) {
//       if (error.response.data.message === 'Unauthorized') {
//         const originRequest = config;
//         //리프레시 토큰 api
//         const response = await postRefreshToken();
//         //리프레시 토큰 요청이 성공할 때
//         if (response.status === 200) {
//           const newAccessToken = response.data.token;

//           setCookie('refreshToken', response.data.refreshToken);
//           axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//           //진행중이던 요청 이어서하기
//           originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axios(originRequest);
//           //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
//         } else if (response.status === 404) {
//           alert('다시 로그인 하세요~');
//           window.location.replace('/login');
//         } else {
//           alert('다시 로그인 하세요!');
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );
