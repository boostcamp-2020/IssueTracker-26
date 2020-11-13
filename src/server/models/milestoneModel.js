const pool = require('../config/db-config');
const { MILESTONE } = require('./queries');

const deleteMilestone = async (id) => {
  try {
    const [rows] = await pool.execute(MILESTONE.DELETE, [id]);
    return rows.affectedRows ? id : undefined;
  } catch (e) {
    return undefined;
  }
};

const getIssueListByMilestoneId = async (milestoneId) => {
  try {
    const [rows] = await pool.execute(
      MILESTONE.GET_ISSUE_LIST_BY_MILESTONE_ID,
      [milestoneId],
    );
    return rows;
  } catch (e) {
    return undefined;
  }
};

const getMilestoneList = async () => {
  try {
    const [rows] = await pool.execute(MILESTONE.GET_MILESTONE_LIST);
    return rows;
  } catch (e) {
    return undefined;
  }
};

const getMilestoneById = async (id) => {
  try {
    const [[rows]] = await pool.execute(MILESTONE.GET_MILESTONE_BY_ID, [id]);
    return rows;
  } catch (e) {
    return undefined;
  }
};

const createMilestone = async ({ title, duedate, description }) => {
  try {
    const [{ insertId }] = await pool.execute(MILESTONE.CREATE, [
      title,
      duedate || null,
      description,
    ]);
    return insertId;
  } catch (e) {
    return undefined;
  }
};

const updateMilestone = async (data) => {
  try {
    const [rows] = await pool.execute(MILESTONE.UPDATE(data));
    return rows.affectedRows ? data.id : undefined;
  } catch (e) {
    return undefined;
  }
};

const getMilestoneTotal = async () => {
  try {
    const [[total]] = await pool.execute(MILESTONE.GETTOTAL);
    return total;
  } catch (e) {
    return undefined;
  }
};

const getMilestoneAll = async () => {
  try {
    const [list] = await pool.execute(MILESTONE.GET_MILESTONE_LIST);
    return list;
  } catch (e) {
    return undefined;
  }
};

const stateChange = async (state, id) => {
  try {
    const [milestone] = await pool.execute(MILESTONE.CHANGE_STATE, [state, id]);
    return milestone;
  } catch (e) {
    return undefined;
  }
};

const getMilestoneRatio = async (id) => {
  try {
    const [list] = await pool.execute(MILESTONE.GETRATIO, [id, id, id]);
    return list[0];
  } catch (e) {
    return undefined;
  }
};

const getMilestoneWithRatio = async () => {
  try {
    const [list] = await pool.execute(MILESTONE.GET_MILESTONE_LIST_WITH_RATIO);
    return list;
  } catch (e) {
    return undefined;
  }
};

module.exports = {
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getMilestoneList,
  getMilestoneById,
  getIssueListByMilestoneId,
  getMilestoneTotal,
  getMilestoneAll,
  stateChange,
  getMilestoneRatio,
  getMilestoneWithRatio,
};
