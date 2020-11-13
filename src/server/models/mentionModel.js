const pool = require('../config/db-config');
const { MENTION } = require('./queries');

const create = async ({ userId, issueId, commentId }) => {
  try {
    const [{ insertId }] = await pool.execute(MENTION.CREATE, [
      userId,
      issueId,
      commentId,
    ]);
    return insertId;
  } catch (err) {
    return undefined;
  }
};

const remove = async ({ issueId, commentId }) => {
  try {
    if (!commentId) {
      const [{ affectedRows }] = await pool.execute(MENTION.REMOVE_NULL, [
        issueId,
      ]);
      return affectedRows === 0 ? undefined : true;
    }
    const [{ affectedRows }] = await pool.execute(MENTION.REMOVE_NOTNULL, [
      issueId,
      commentId,
    ]);
    return affectedRows === 0 ? undefined : true;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  create,
  remove,
};
