const pool = require('../config/db-config');
const { MILESTONE } = require('./queries');

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

const createMilestone = async ({ title, dueDate, description }) => {
  try {
    const [{ insertId }] = await pool.execute(MILESTONE.CREATE, [
      title,
      dueDate,
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

module.exports = {
  createMilestone,
  updateMilestone,
  getMilestoneList,
  getIssueListByMilestoneId,
};
