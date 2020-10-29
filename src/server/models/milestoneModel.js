const pool = require('../config/db-config');
const { MILESTONE } = require('./queries');

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

module.exports = {
  createMilestone,
};
