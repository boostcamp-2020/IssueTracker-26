const USER = {
  SIGNUP: `insert into user(username, password) values(?,?)`,
  FINDUSER: `select * from user where username = ?`,
  FIND_USER_BY_ID: `select * from user where id=?`,
  FIND_SOCIAL_USER: `select * from user where username = ? and social = 1`,
  CREATE_SOCIAL_USER: `insert into user(username, password, profile, social) values (?,?,?,?)`,
  UPDATE: `update user set profile=? where id=?`,
};

const LABEL = {
  CREATE: `insert into label(title, description, color) values(?,?,?)`,
  GETLABELLIST: `select id, title, description, color from label`,
  UPDATELABEL: `update label set title = ?, description = ?, color = ? where id = ?`,
  DELETELABEL: `delete from label where id = ?`,
  GETLABELTOTAL: 'select count(*) as count from label',
};

const MILESTONE = {
  CREATE: `insert into milestone(title, dueDate, description) values(?,?,?)`,
  UPDATE: ({ id, title, duedate, description }) => {
    let fields = '';
    if (title) fields += `title='${title}',`;
    if (duedate) fields += `dueDate='${duedate}',`;
    if (description) fields += `description='${description}'`;
    fields =
      fields[fields.length - 1] === ','
        ? fields.slice(0, fields.length - 1)
        : fields;
    return `update milestone set ${fields.trim()} where id=${id}`;
  },
  DELETE: `delete from milestone where id=?`,
  GET_MILESTONE_LIST: `select id, title, dueDate, description, state from milestone`,
  GET_MILESTONE_BY_ID: `select id, title, dueDate, description, state from milestone where id = ?`,
  GET_ISSUE_LIST_BY_MILESTONE_ID: `select i.id, i.state, i.milestone_id from issue i left join user u on i.user_id=u.id where i.milestone_id=?`,
  GETTOTAL: `select count(*) as count from milestone`,
  CHANGE_STATE: `update milestone set state = ? where id = ?`,
  GETRATIO: `select *, (select count(*) from issue i, milestone m where i.milestone_id = m.id and m.id=? and i.state = 0) / 
  (select count(*) from issue i, milestone m where i.milestone_id = m.id and m.id=?) * 100 as ratio from milestone where id = ?;`,
  GET_MILESTONE_LIST_WITH_RATIO: `select a.id, a.state, a.title, a.dueDate, a.description, close/total*100 as ratio, close, total from (select m.id, m.state, m.title, m.dueDate, m.description, count(i.id) as close from milestone m left join issue i on i.milestone_id = m.id and i.state=0 group by m.id) a left join
  (select m.id, count(i.id)as total from milestone m left join issue i on i.milestone_id = m.id group by m.id) b on a.id=b.id`,
};

const ISSUE = {
  GETISSUELIST: `select i.id, i.title, i.state, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename, count(c.id) as commentCount 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id left join comment c on i.id=c.issue_id where i.state=1 group by i.id order by i.id desc`,

  GETISSUELABEL: `select l.id as labelid,l.description ,l.title, l.color from issuehaslabel ih, label l where ih.issue_id=? and ih.label_id=l.id`,

  GETISSUEASSIGNEE: `select u.id, u.username, u.profile from assignee a, user u where a.issue_id=? and u.id=a.user_id`,

  GETISSUEDETAIL: `select i.id, i.title, i.content, i.user_id, u.username, u.profile, i.state, i.createdat, i.milestone_id, m.title as milestonename 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id where i.id = ?`,

  GETISSUECOMMENT: `select c.id, c.content, c.createdat, u.id as user_id, u.username, u.profile from comment c, user u where u.id=c.user_id and c.issue_id = ?`,

  GETMILESTONE: `select m.id, m.title, (select count(*) from issue where milestone_id = (select milestone_id from issue where id = ?) and state = 0) / count(*) * 100 as ratio from issue i, milestone m 
  where milestone_id = (select milestone_id from issue where id = ?) and i.milestone_id=m.id group by m.id`,

  CREATEISSUE: `insert into issue(title, content, user_id, milestone_id) values(?,?,?,?)`,

  CREATEISSUEHASLABEL: `insert into issuehaslabel(issue_id, label_id) values(?,?)`,

  CREATEASSIGNEE: `insert into assignee(user_id, issue_id) values(?,?)`,

  STATECHANGE: `update issue set state = ? where id = ? `,

  TITLEUPDATE: `update issue set title = ? where id = ?`,

  CONTENTUPDATE: `update issue set content = ? where id = ?`,

  ASSIGNEESDELETE: `delete from assignee where issue_id = ? `,

  ASSIGNEEUPDATE: `insert into assignee(user_id, issue_id) values(?,?)`,

  LABELSDELETE: `delete from issuehaslabel where issue_id = ? `,

  LABELUPDATE: `insert into issuehaslabel(issue_id, label_id) values(?,?)`,

  MILESTONEUPDATE: `update issue set milestone_id = ? where id = ?`,

  GETISSUELISTBYID: `select i.id, i.title, i.state, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename, count(c.id) as commentCount 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id left join comment c on i.id=c.issue_id where i.state=1 and i.user_id=? group by i.id`,

  GETISSUELISTBYASSIGNEE: `select a.issue_id, i.state from assignee a, issue i where a.user_id=? and a.issue_id=i.id and i.state=1;`,

  GETISSUELISTBYISSUEID: `select i.id, i.title, i.state, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename, count(c.id) as commentCount 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id left join comment c on i.id=c.issue_id where i.state=1 and i.id=? group by i.id`,

  GETISSUELISTBYCOMMENT: `select c.issue_id, i.state from comment c, issue i where c.user_id=? and c.issue_id=i.id and i.state=1 group by issue_id`,

  GETISSUELISTBYCLOSE: `select i.id, i.title, i.state, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename, count(c.id) as commentCount 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id left join comment c on i.id=c.issue_id where i.state=0 group by i.id order by i.id desc`,

  GETISSUELISTBYALL: `select i.id, i.title, i.state, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename, count(c.id) as commentCount 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id left join comment c on i.id=c.issue_id group by i.id order by i.id desc`,

  GETISSUEALLLIST: `select i.id, i.title, i.state, i.content, i.user_id, u.username, i.createdat, i.milestone_id, m.title as milestonename, count(c.id) as commentCount 
  from issue i left join user u on i.user_id=u.id left join milestone m on i.milestone_id=m.id left join comment c on i.id=c.issue_id group by i.id order by i.id desc`,
};

const COMMENT = {
  CREATE: `insert into comment(content, user_id, issue_id) VALUES(?,?,?)`,
  READ: `select id, content, user_id, issue_id from comment where issue_id = ?`,
  REMOVE: `delete from comment where id=?`,
  UPDATE: `update comment set content = ? where id = ?`,
  GET_COMMENT: `select c.id, c.content, c.createdat, u.id as user_id, u.username, u.profile from comment c, user u where u.id=c.user_id and c.id = ?`,
};

const MENTION = {
  CREATE: `insert into mention(user_id, issue_id, comment_id) VALUES(?,?,?)`,
  REMOVE_NULL: `delete from mention where issue_id = ? and comment_id is null`,
  REMOVE_NOTNULL: `delete from mention where issue_id = ? and comment_id = ?`,
};

module.exports = {
  USER,
  LABEL,
  MILESTONE,
  ISSUE,
  COMMENT,
  MENTION,
};
