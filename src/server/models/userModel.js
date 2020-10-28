const pool = require('../config/db-config');
const { USER } = require('./queries');

const signUp = async (userName, password) => {
  try {
    const [{ insertId }] = await pool.execute(USER.SIGNUP, [
      userName,
      password,
    ]);
    return insertId;
  } catch (err) {
    return undefined;
  }
};

module.exports = { signUp };
