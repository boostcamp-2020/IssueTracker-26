const pool = require('../config/db-config');
const { LABEL } = require('./queries');

const createLabel = async (userInfo) => {
  try {
    const { title, description, color } = userInfo;
    const [{ insertId }] = await pool.execute(LABEL.CREATE, [
      title,
      description,
      color,
    ]);
    return insertId;
  } catch (err) {
    return undefined;
  }
};

module.exports = { createLabel };
