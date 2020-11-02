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
  deleteMilestone,
};
