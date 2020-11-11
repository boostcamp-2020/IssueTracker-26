import HTTP from '../http-common';

const commentAPI = {};

commentAPI.updateCommentContent = ({ commentId, issueId, content }) =>
  fetch(`${HTTP}api/comment/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, issueId }),
  }).then((res) => res.status);

commentAPI.createComment = ({ issueId, userId, content }) =>
  fetch(`${HTTP}api/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ issueId, userId, content }),
  }).then((res) => {
    if (res.status === 201) return res.json();
    return {};
  });

export default commentAPI;
