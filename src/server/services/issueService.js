const issueModel = require('../models/issueModel');

const getIssueList = async () => {
  try {
    const issueList = await issueModel.getIssueList();
    const label = [];
    const assignee = [];
    issueList.forEach((e) => {
      label.push(issueModel.getIssueLabel(e.id));
      assignee.push(issueModel.getIssueAssignee(e.id));
    });
    const labelArray = await Promise.all(label);
    const assigneeArray = await Promise.all(assignee);
    issueList.forEach((e, i) => {
      e.label = labelArray[i];
      e.assignee = assigneeArray[i];
    });
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueDetail = async (id) => {
  try {
    const issue = await issueModel.getIssueDetail(id);
    issue.label = await issueModel.getIssueLabel(id);
    issue.assignee = await issueModel.getIssueAssignee(id);
    issue.comment = await issueModel.getIssueComment(id);
    issue.ratio = await issueModel.getIssueRatio(id);
    return issue;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  getIssueList,
  getIssueDetail,
};
