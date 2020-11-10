import HTTP from '../http-common';

const issueAPI = {};

issueAPI.getIssue = (id, token) =>
  fetch(`${HTTP}api/issue/detail/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 200) return res.json();
    return {};
  });

export default issueAPI;
