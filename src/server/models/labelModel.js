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

const updateLabel = async (id, userInfo) => {
  try {
    const { title, description = null, color } = userInfo;
    const [{ changedRows }] = await pool.execute(LABEL.UPDATELABEL, [
      title,
      description,
      color,
      id,
    ]);
    return changedRows;
  } catch (err) {
    return undefined;
  }
};

const deleteLabel = async (id) => {
  try {
    const [{ affectedRows }] = await pool.execute(LABEL.DELETELABEL, [id]);
    return affectedRows;
  } catch (err) {
    return undefined;
  }
};

const getLabelTotal = async () => {
  try {
    const [total] = await pool.execute(LABEL.GETLABELTOTAL);
    return total[0];
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  createLabel,
  getLabelList,
  updateLabel,
  deleteLabel,
  getLabelTotal,
};
