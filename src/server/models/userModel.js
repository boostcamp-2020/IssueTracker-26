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
    return result;
  } catch (err) {
    return undefined;
  }
};

const findSocialUser = async (userName) => {
  try {
    const [data] = await pool.execute(USER.FIND_SOCIAL_USER, [userName]);
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const createSocialUser = async (userInfo) => {
  try {
    const { userName, password, profile, social = 1 } = userInfo;
    const [{ insertId }] = await pool.execute(USER.CREATE_SOCIAL_USER, [
      userName,
      password,
      profile,
      social,
    ]);
    return insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports = {
  signUp,
  checkDuplicated,
  findSocialUser,
  createSocialUser,
};
