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

export default api;
