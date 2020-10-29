const issueService = require('../services/issueService');

const getIssueList = async (req, res) => {
  const issueList = await issueService.getIssueList();
  console.log(issueList);
  if (issueList) {
    return res.status(200).json(issueList);
  }
  return res.status(500).end();
};

module.exports = {
  getIssueList,
};
