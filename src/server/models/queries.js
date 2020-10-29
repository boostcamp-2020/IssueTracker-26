const USER = {
  SIGNUP: `INSERT INTO user(userName, password) VALUES(?,?)`,
};

const LABEL = {
  CREATE: `INSERT INTO label(title, description, color) VALUES(?,?,?)`,
};

module.exports = {
  USER,
  LABEL,
};
