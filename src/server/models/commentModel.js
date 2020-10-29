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

module.exports = {
  create,
};
