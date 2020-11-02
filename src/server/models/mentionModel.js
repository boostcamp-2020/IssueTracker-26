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

module.exports = {
  create,
};
