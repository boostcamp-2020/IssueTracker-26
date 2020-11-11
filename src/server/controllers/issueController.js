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

const createIssue = async (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) return res.status(400).end();

  const issueInfo = req.body;
  const issueId = await issueService.createIssue(issueInfo);
  if (issueId) {
    return res.status(201).json(issueId);
  }
  return res.status(500).end();
};

const stateChange = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { state } = req.body;
  if (Number.isNaN(id)) return res.status(400).end();

  const issue = await issueService.stateChange(state, id);

  if (issue) {
    return res.status(200).json(issue);
  }
  return res.status(500).end();
};

const titleUpdate = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body;
  if (Number.isNaN(id) || !title) return res.status(400).end();

  const issue = await issueService.titleUpdate(id, title);

  if (issue) {
    return res.status(200).end();
  }
  return res.status(500).end();
};

const contentUpdate = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { content } = req.body;
  if (Number.isNaN(id) || !content) return res.status(400).end();

  const issue = await issueService.contentUpdate(id, content);

  if (issue) {
    return res.status(200).end();
  }
  return res.status(500).end();
};

const assigneesUpdate = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { assignees } = req.body;
  if (Number.isNaN(id)) return res.status(400).end();

  const issue = await issueService.assigneesUpdate(id, assignees);

  if (issue) {
    return res.status(200).end();
  }
  return res.status(500).end();
};

const labelsUpdate = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { labels } = req.body;
  if (Number.isNaN(id)) return res.status(400).end();

  const issue = await issueService.labelsUpdate(id, labels);

  if (issue) {
    return res.status(200).end();
  }
  return res.status(500).end();
};

const milestoneUpdate = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { milestoneId } = req.body;
  if (Number.isNaN(id)) return res.status(400).end();

  const milestone = await issueService.milestoneUpdate(id, milestoneId);
  if (milestone) {
    return res.status(200).json(milestone);
  }
  return res.status(500).end();
};

const getFilterIssueList = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { type } = req.params;
  if (Number.isNaN(id)) return res.status(400).end();

  const issueList = await issueService.getFilterIssueList(id, type);
  if (issueList) {
    return res.status(200).json(issueList);
  }
  return res.status(500).end();
};

const getIssueAllList = async (req, res) => {
  const issueList = await issueService.getIssueAllList();
  if (issueList) {
    return res.status(200).json(issueList);
  }
  return res.status(500).end();
};

module.exports = {
  getIssueList,
  getIssueDetail,
  createIssue,
  stateChange,
  titleUpdate,
  contentUpdate,
  assigneesUpdate,
  labelsUpdate,
  milestoneUpdate,
  getFilterIssueList,
  getIssueAllList,
};
