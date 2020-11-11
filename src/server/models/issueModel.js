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

const getMilestone = async (id) => {
  try {
    const [milestone] = await pool.execute(ISSUE.GETMILESTONE, [id, id]);
    return milestone;
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

const titleUpdate = async (id, title) => {
  try {
    const [issue] = await pool.execute(ISSUE.TITLEUPDATE, [title, id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const contentUpdate = async (id, content) => {
  try {
    const [issue] = await pool.execute(ISSUE.CONTENTUPDATE, [content, id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const assigneesDelete = async (id) => {
  try {
    const [issue] = await pool.execute(ISSUE.ASSIGNEESDELETE, [id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const assigneesUpdate = async (id, assigneeId) => {
  try {
    const [issue] = await pool.execute(ISSUE.ASSIGNEEUPDATE, [assigneeId, id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const labelsDelete = async (id) => {
  try {
    const [issue] = await pool.execute(ISSUE.LABELSDELETE, [id]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const labelUpdate = async (id, labelId) => {
  try {
    const [issue] = await pool.execute(ISSUE.LABELUPDATE, [id, labelId]);
    return issue;
  } catch (err) {
    return undefined;
  }
};

const milestoneUpdate = async (id, milestoneId) => {
  try {
    const [milestone] = await pool.execute(ISSUE.MILESTONEUPDATE, [
      milestoneId,
      id,
    ]);

    return milestone;
  } catch (err) {
    return undefined;
  }
};

const getIssueListById = async (id) => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELISTBYID, [id]);
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueListByAssignee = async (id) => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELISTBYASSIGNEE, [id]);
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueListByIssueId = async (id) => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELISTBYISSUEID, [id]);
    return issueList[0];
  } catch (err) {
    return undefined;
  }
};

const getIssueListByComment = async (id) => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELISTBYCOMMENT, [id]);
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueListByClose = async () => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELISTBYCLOSE, []);
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueListByAll = async () => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUELISTBYALL, []);
    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueAllList = async () => {
  try {
    const [issueList] = await pool.execute(ISSUE.GETISSUEALLLIST, []);
    return issueList;
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
  getMilestone,
  createIssue,
  createIssueHasLbel,
  createAssignee,
  stateChange,
  titleUpdate,
  contentUpdate,
  assigneesDelete,
  assigneesUpdate,
  labelsDelete,
  labelUpdate,
  milestoneUpdate,
  getIssueListById,
  getIssueListByAssignee,
  getIssueListByIssueId,
  getIssueListByComment,
  getIssueListByClose,
  getIssueListByAll,
  getIssueAllList,
};
