const pool = require('../config/db-config');
const { ISSUE } = require('./queries');

const getIssueList = async () => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELIST, []);
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueLabel = async (id) => {
  try {
    const [issueLabel] = await pool.execute(ISSUE.GETISSUELABEL, [id]);
    return issueLabel;
  } catch (err) {
    return undefined;
  }
};

const getIssueAssignee = async (id) => {
  try {
    const [issueAssignee] = await pool.execute(ISSUE.GETISSUEASSIGNEE, [id]);
    return issueAssignee;
  } catch (err) {
    return undefined;
  }
};

const getIssueDetail = async (id) => {
  try {
    const [[issue]] = await pool.execute(ISSUE.GETISSUEDETAIL, [id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const getIssueComment = async (id) => {
  try {
    const [comment] = await pool.execute(ISSUE.GETISSUECOMMENT, [id]);
    return comment;
  } catch (err) {
    return undefined;
  }
};

const getIssueRatio = async (id) => {
  try {
    const [ratio] = await pool.execute(ISSUE.GETISSUERATIO, [id, id]);
    return ratio;
  } catch (err) {
    return undefined;
  }
};

const createIssue = async (issueInfo) => {
  try {
    const { title, content, userId } = issueInfo;
    const milestoneId = issueInfo.milestoneId || null;
    const [issue] = await pool.execute(ISSUE.CREATEISSUE, [
      title,
      content,
      userId,
      milestoneId,
    ]);
    return issue.insertId;
  } catch (err) {
    return undefined;
  }
};

const createIssueHasLbel = async (issueId, labelId) => {
  try {
    const [issueHasLabel] = await pool.execute(ISSUE.CREATEISSUEHASLABEL, [
      issueId,
      labelId,
    ]);
    return issueHasLabel.insertId;
  } catch (err) {
    return undefined;
  }
};

const createAssignee = async (assigneeId, issueId) => {
  try {
    const [assingnee] = await pool.execute(ISSUE.CREATEASSIGNEE, [
      assigneeId,
      issueId,
    ]);
    return assingnee.insertId;
  } catch (err) {
    return undefined;
  }
};

const stateChange = async (state, id) => {
  try {
    const [issue] = await pool.execute(ISSUE.STATECHANGE, [state, id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  getIssueList,
  getIssueLabel,
  getIssueAssignee,
  getIssueDetail,
  getIssueComment,
  getIssueRatio,
  createIssue,
  createIssueHasLbel,
  createAssignee,
  stateChange,
};
