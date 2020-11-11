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

issueAPI.updateMilestone = (issueId, milestoneId) =>
  fetch(`${HTTP}api/issue/milestone/${issueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ milestoneId }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return {};
  });

issueAPI.updateLabelList = (issueId, labelList) =>
  fetch(`${HTTP}api/issue/labels/${issueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ labels: labelList }),
  }).then((res) => res.status);

issueAPI.updateAssigneeList = (issueId, assigneeList) =>
  fetch(`${HTTP}api/issue/assignees/${issueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ assignees: assigneeList }),
  }).then((res) => res.status);

issueAPI.updateIssueTitle = (issueId, title) =>
  fetch(`${HTTP}api/issue/title/${issueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.status);

issueAPI.updateIssueContent = (issueId, content) =>
  fetch(`${HTTP}api/issue/content/${issueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.status);
export default issueAPI;
