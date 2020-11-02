const pool = require('../config/db-config');
const { COMMENT } = require('./queries');

const create = async ({ content, userId, issueId }) => {
  try {
    const [{ insertId }] = await pool.execute(COMMENT.CREATE, [
      content,
      userId,
      issueId,
    ]);
    return insertId;
  } catch (err) {
    return undefined;
  }
};

const read = async (issueId) => {
  try {
    const [result] = await pool.execute(COMMENT.READ, [issueId]);
    return result;
  } catch (err) {
    return undefined;
  }
};

const remove = async (commentId) => {
  try {
    const [{ affectedRows }] = await pool.execute(COMMENT.REMOVE, [commentId]);
    const result = affectedRows === 0 ? undefined : true;
    return result;
  } catch (err) {
    return undefined;
  }
};

const update = async (commentId, content) => {
  try {
    const [{ affectedRows }] = await pool.execute(COMMENT.UPDATE, [
      content,
      commentId,
    ]);
    return affectedRows === 0 ? undefined : true;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  create,
  read,
  remove,
  update,
};
