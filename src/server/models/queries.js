const USER = {
  SIGNUP: `INSERT INTO user(userName, password) VALUES(?,?)`,
};

const MILESTONE = {
  CREATE: `INSERT INTO milestone(title, dueDate, description) VALUES(?,?,?)`,
};

module.exports = {
  USER,
  MILESTONE,
};
