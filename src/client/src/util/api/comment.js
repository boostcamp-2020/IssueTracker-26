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

export default commentAPI;
