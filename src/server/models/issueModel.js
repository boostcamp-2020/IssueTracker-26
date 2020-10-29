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
    const [issue] = await pool.execute(ISSUE.GETISSUEDETAIL, [id]);
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

module.exports = {
  getIssueList,
  getIssueLabel,
  getIssueAssignee,
  getIssueDetail,
  getIssueComment,
  getIssueRatio,
};
