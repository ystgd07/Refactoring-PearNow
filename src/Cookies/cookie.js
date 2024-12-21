import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (n, value, options) => {
  return cookies.set(n, value, { ...options });
};

export const getCookie = (n) => {
  return cookies.get(n);
};
