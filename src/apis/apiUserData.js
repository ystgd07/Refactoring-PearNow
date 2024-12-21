import axios from 'axios';

export async function fetchUserData() {
  const res = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/detail`,
  );
  console.log('res', res);
  return res.data;
}

export async function fetchUserUpdateData(data, userMainDataid) {
  // console.log('updatedate!!', data);
  const formData = new FormData();
  const obj = {
    mail: data.userMemberDto.mail,
    image: data.userMemberDto.image,
    name: data.userMemberDto.name,
    phone: data.userMemberDto.phone,
    team: data.userMemberDto.team,
  };
  console.log('updatate2', obj);
  const jsonBlob = new Blob([JSON.stringify(obj)], {
    type: 'application/json',
  });

  formData.append('userMemberDto', jsonBlob);

  console.log('formData', formData);
  const res = await axios.put(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/change?id=${userMainDataid}`,
    formData,
  );

  console.log('res', res);
  return res.data;
}

export async function updateUserImg(file, id, filename) {
  console.log('updateUserImg:file', file);
  const formData = new FormData();

  const imgBlob = new Blob([JSON.stringify(file)], {
    type: 'multipart/form-data',
  });

  formData.append('image', file);

  const res = await axios.put(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/imagechange?id=${id}&fileName=${filename}`,
    formData,
  );
  return res.data;
}
