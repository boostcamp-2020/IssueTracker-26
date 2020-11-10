const issueModel = require('../models/issueModel');

const getIssueList = async () => {
  try {
    let issueList = await issueModel.getIssueList();
    const promiseList = [];
    issueList.forEach((issue) => {
      const label = issueModel.getIssueLabel(issue.id);
      const assignee = issueModel.getIssueAssignee(issue.id);
      promiseList.push(label);
      promiseList.push(assignee);
    });

    await Promise.all(promiseList).then((item) => {
      let index = -2;
      issueList = issueList.map((issue) => {
        index += 2;
        return { ...issue, label: item[index], assignee: item[index + 1] };
      });
    });

    return issueList;
  } catch (err) {
    return undefined;
  }
};

const getIssueDetail = async (id) => {
  try {
    const optionName = ['label', 'assignee', 'comment', 'milestone'];
    const issue = await issueModel.getIssueDetail(id);
    const option = await Promise.all([
      issueModel.getIssueLabel(id),
      issueModel.getIssueAssignee(id),
      issueModel.getIssueComment(id),
      issueModel.getMilestone(id),
    ]);
    option.forEach((item, index) => {
      issue[optionName[index]] = item;
    });
    return issue;
  } catch (err) {
    return undefined;
  }
};

const createIssue = async (issueInfo) => {
  try {
    const issueId = await issueModel.createIssue(issueInfo);
    const { assignees, labels } = issueInfo;
    const promiseList = [];
    labels.forEach((label) => {
      promiseList.push(issueModel.createIssueHasLbel(issueId, label.id));
    });

    assignees.forEach((assignee) => {
      promiseList.push(issueModel.createAssignee(assignee.id, issueId));
    });

    await Promise.all(promiseList);
    return issueId;
  } catch (err) {
    return undefined;
  }
};

const stateChange = async (state, id) => {
  let issue;
  try {
    if (state === 'Open') {
      issue = await issueModel.stateChange(1, id);
    } else {
      issue = await issueModel.stateChange(0, id);
    }

    return issue;
  } catch (err) {
    return undefined;
  }
};

const titleUpdate = async (id, title) => {
  try {
    const issue = await issueModel.titleUpdate(id, title);

    return issue;
  } catch (err) {
    return undefined;
  }
};

const contentUpdate = async (id, content) => {
  try {
    const issue = await issueModel.contentUpdate(id, content);

    return issue;
  } catch (err) {
    return undefined;
  }
};

const assigneesUpdate = async (id, assignees) => {
  try {
    const issue = await issueModel.assigneesDelete(id);
    const promiseList = assignees.map((assigneeId) => {
      return issueModel.assigneesUpdate(id, assigneeId);
    });

    await Promise.all(promiseList);

    return issue;
  } catch (err) {
    return undefined;
  }
};

const labelsUpdate = async (id, labels) => {
  try {
    const issue = await issueModel.labelsDelete(id);
    const promiseList = labels.map((labelId) => {
      return issueModel.labelUpdate(id, labelId);
    });

    await Promise.all(promiseList);

    return issue;
  } catch (err) {
    return undefined;
  }
};

const milestoneUpdate = async (id, milestoneId) => {
  try {
    const mid = milestoneId || null;
    await issueModel.milestoneUpdate(id, mid);
    const milestone = await issueModel.getMilestone(id);
    return milestone;
  } catch (err) {
    return undefined;
  }
};

const getFilterIssueList = async (id, type) => {
  try {
    let issueList;
    switch (type) {
      case 'Open issues':
        issueList = await issueModel.getIssueList();
        break;
      case 'Your issues':
        issueList = await issueModel.getIssueListById(id);
      // eslint-disable-next-line no-fallthrough
      case 'Author':
        issueList = await issueModel.getIssueListById(id);
        break;
      case 'Everything assigned to you': {
        issueList = await issueModel.getIssueListByAssignee(id);
        const promiseList = issueList.map((issue) => {
          return issueModel.getIssueListByIssueId(issue.issue_id);
        });
        issueList = await Promise.all(promiseList);
        break;
      }
      case 'Everything mentioning you': {
        issueList = await issueModel.getIssueListByComment(id);
        const promiseList = issueList.map((issue) => {
          return issueModel.getIssueListByIssueId(issue.issue_id);
        });
        issueList = await Promise.all(promiseList);
        break;
      }
      case 'Closed issues':
        issueList = await issueModel.getIssueListByClose();
        break;
      case 'All':
        issueList = await issueModel.getIssueListByAll();
        break;
      default:
        break;
    }

    const promiseList = [];
    issueList.forEach((issue) => {
      const label = issueModel.getIssueLabel(issue.id);
      const assignee = issueModel.getIssueAssignee(issue.id);
      promiseList.push(label);
      promiseList.push(assignee);
    });

    await Promise.all(promiseList).then((item) => {
      let index = -2;
      issueList = issueList.map((issue) => {
        index += 2;
        return { ...issue, label: item[index], assignee: item[index + 1] };
      });
    });

    return issueList;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  getIssueList,
  getIssueDetail,
  createIssue,
  stateChange,
  titleUpdate,
  contentUpdate,
  assigneesUpdate,
  labelsUpdate,
  milestoneUpdate,
  getFilterIssueList,
};
