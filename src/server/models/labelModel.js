const pool = require('../config/db-config');
const { LABEL } = require('./queries');

const createLabel = async (userInfo) => {
  try {
    const { title, description = null, color } = userInfo;
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

const getLabelList = async () => {
  try {
    const [labelList] = await pool.execute(LABEL.GETLABELLIST);
    return labelList;
  } catch (err) {
    return undefined;
  }
};

module.exports = { createLabel, getLabelList };
