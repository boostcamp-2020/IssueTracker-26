import Http from '../http-common';

const api = {};

api.signIn = (id, password) =>
  fetch(`${Http}api/user/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: id,
      password,
    }),
  }).then((res) => res.json());

api.signUp = (id, password) =>
  fetch(`${Http}api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: id,
      password,
    }),
  }).then((res) => (res.status === 400 ? {} : res.json()));

api.checkDuplicated = (userName) =>
  fetch(`${Http}api/userName`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName }),
  }).then((res) => {
    if (res.status === 400) return { err: '입력 형식이 올바르지 않습니다.' };
    if (res.status === 409) return { msg: '이미 존재하는 아이디입니다.' };
    return {};
  });

export default api;
