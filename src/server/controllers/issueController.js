const issueService = require('../services/issueService');

const getIssueList = async (req, res) => {
  const issueList = await issueService.getIssueList();
  if (issueList) {
    return res.status(200).json(issueList);
  }
  return res.status(500).end();
};

const getIssueDetail = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const issue = await issueService.getIssueDetail(id);
  if (issue) {
    return res.status(200).json(issue);
  }
  return res.status(404).end();
};

const setIssue = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const issue = await issueService.getIssueDetail(id);
  if (issue) {
    return res.status(200).json(issue);
  }
  return res.status(404).end();
};

module.exports = {
  getIssueList,
  getIssueDetail,
  setIssue,
};
