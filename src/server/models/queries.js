const USER = {
  SIGNUP: `insert into user(username, password) values(?,?)`,
  FINDUSER: `select * from user where username = ?`,
};

const LABEL = {
  CREATE: `insert into label(title, description, color) values(?,?,?)`,
  GETLABELLIST: `select id, title, description, color from label`,
};

const MILESTONE = {
  CREATE: `insert into milestone(title, duedate, description) values(?,?,?)`,
};

const ISSUE = {
  GETISSUELIST: `select i.id, i.title, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id where i.state=1`,

  GETISSUELABEL: `select l.id as labelid, l.title, l.color from issueHasLabel ih, label l where ih.issue_id=? and ih.label_id=l.id`,

  GETISSUEASSIGNEE: `select u.id, u.username from assignee a, user u where a.issue_id=? and u.id=a.user_id`,

  GETISSUEDETAIL: `select i.id, i.title, i.content, i.user_id, u.username, i.state, i.createdat, i.milestone_id, m.title as milestonename 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id where i.id = ?`,

  GETISSUECOMMENT: `select c.id, c.content, c.createdat, u.id, u.username from comment c, user u where u.id=c.user_id and c.issue_id = ?`,

  GETISSUERATIO: `select (select count(*) from issue where milestone_id = (select milestone_id from issue where id = ?) and state = 1) / count(*) as ratio from issue 
  where milestone_id = (select milestone_id from issue where id = ?)`,

  CREATEISSUE: `insert into issue(title, content, user_id, milestone_id) values(?,?,?,?)`,

  CREATEISSUEHASLABEL: `insert into issuehaslabel(issue_id, label_id) values(?,?)`,

  CREATEASSIGNEE: `insert into assignee(user_id, issue_id) values(?,?)`,
};

module.exports = {
  USER,
  LABEL,
  MILESTONE,
  ISSUE,
};
