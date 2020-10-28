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

const checkDuplicated = async (userName) => {
  try {
    const [[result]] = await pool.execute(
      'select * from user where userName=?',
      [userName],
    );
    pool.end();
    return result;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  signUp,
  checkDuplicated,
};
