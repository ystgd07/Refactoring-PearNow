import axios from 'axios';
import { format } from 'date-fns';
import { getCookie, setCookie } from '../Cookies/cookie';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
let accessToken = '';

//로그인,계정생성 api
export async function registApi({ id, pw, name }) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/join`,
    {
      id,
      pw,
      name,
    },
  );
}

export async function loginApi(form) {
  console.log('form', form);
  console.log('envvalue', process.env.REACT_APP_API_DOMAIN);
  const res = await axios
    .post(`${process.env.REACT_APP_API_DOMAIN}/api/user/login`, form, {
      withCredentials: true,
    })
    .then((res) => {
      console.log('res', res);
      // const accessToken = res.data.tokenInfo.accessToken;
      accessToken = res.data.tokenInfo.accessToken;
      console.log('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      let cookie = getCookie('refreshToken');
      console.log('getCookie :');
    })
    .catch((err) => {
      console.error(err);
    });

  const onSilentRefresh = () => {
    axios
      .post('/referesh', form)
      .then(onLoginSuccess)
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginSuccess = (res) => {
    const { accessToken } = res.data.token.accessToken;

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME);
  };
}

export const updateApi = async (projectNumber, data) => {
  console.log('projectNumberdata', data);

  const res = await axios.put(
    `${process.env.REACT_APP_API_DOMAIN}/api/project/change?projectNumber=${projectNumber}`,
    data,
  );
};

//프로젝트 생성 api(post)
export async function createProjectApi(pjtObj) {
  console.log('pjtObj입니다.', pjtObj);
  pjtObj.start_date = format(pjtObj.start_date, 'yyyy-MM-dd');
  pjtObj.end_date = format(pjtObj.end_date, 'yyyy-MM-dd');
  const res = await axios.post(
    `${process.env.REACT_APP_API_DOMAIN}/api/project`,
    pjtObj,
  );
}

// 이미지 가져오기 - 파일 객체 자체를 던져줌요
export const getUserImg = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/userimg`,
  );
  return res;
};

// 로그아웃
export async function logoutApi() {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/api/user/logout_info`,
      {},
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error('로그아웃 중 에러 발생', error);
  }
}

// 권한 받기 /api/user/authority?project_no=project_no
export async function fetchMyRole(currentProjectNumber) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/authority?project_no=${currentProjectNumber}`,
    { headers: { project_no: currentProjectNumber } }, // 권한받기용 헤더에 현재 프넘 보내깅깅이
  );
  // .then((e) => {
  //   console.log('headers', e.headers);
  //   let acc = e.headers['newaccesstoken'];

  //   console.log('acc', acc);
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${acc}`;
  // });
  // console.log('resheaders', res.headers);

  return res.data;
}
