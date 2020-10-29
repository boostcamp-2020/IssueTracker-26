const issueModel = require('../models/issueModel');

const getIssueList = async () => {
  try {
    const issueList = await issueModel.getIssueList();
    console.log('0');
    issueList.forEach(async (e) => {
      const label = await issueModel.getIssueLabel(e.ID);
      console.log('1');
      const assignee = await issueModel.getIssueAssignee(e.ID);
      console.log('2');
      e.label = label;
      e.assignee = assignee;
    });
    return issueList;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  getIssueList,
};
