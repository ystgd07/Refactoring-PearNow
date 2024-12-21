import axios from 'axios';

export async function fetchInviteProject() {
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/project/invitation`,
  );
  console.log('res', res);
  return res.data;
}
// !isUpdateLoading && setIsOpenUpdateModal
// type={`${modalState === '이메일' ? 'email' : 'text'}`}
// value={stateQuarter}
// placeholder={placeholderStatus}
// onChange={(e) => {
//   if (modalState === '이메일') setUpdateMail(e.target.value);
//   else if (modalState === '전화번호')
//     setUpdatePhone(e.target.value);
//   else setUpdateTeam(e.target.value);
// }}
// className="w-full rounded-lg shadow-md"
