const issueService = require('../services/issueService');

const getIssueList = async (req, res) => {
  const issueList = await issueService.getIssueList();
  if (issueList) {
    return res.status(200).json(issueList);
  }
  return res.status(500).end();
};

const getIssueDetail = async (req, res) => {
  const { id } = req.params;
  const issue = await issueService.getIssueDetail(id);
  if (issue) {
    return res.status(200).json(issue);
  }
  return res.status(500).end();
};

module.exports = {
  getIssueList,
  getIssueDetail,
};
