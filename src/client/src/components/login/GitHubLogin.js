import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import UserContext from '../Context/UserContext';
import http from '../../util/http-common';

function GitHubLogin() {
  const { state, setState } = useContext(UserContext);
  const history = useHistory();
  const { search } = history.location;
  const queries = qs.parse(search);
  const { error, code } = queries;
  if (error) return history.replace('/login');
  if (!code) return history.replace('/login');
  fetch(`${http}api/auth/github`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      code,
    }),
  })
    .then((res) => {
      if (res.status === 401) return {};
      return res.json();
    })
    .then(({ id, token, userName, profile }) => {
      if (!token) return history.replace('/login');
      localStorage.setItem('jwt', token);
      history.replace('/');
      return setState({
        ...state,
        isLoggedIn: true,
        token,
        id,
        userName,
        profile,
      });
    });

  return <></>;
}

export default GitHubLogin;
