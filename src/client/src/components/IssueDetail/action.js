const IssueDetailAction = {};

// Not promise
IssueDetailAction.SET_LABEL_LIST = 'SET_LABEL_LIST';
IssueDetailAction.SET_ASSIGNEE_LIST = 'SET_ASSIGNEE_LIST';
IssueDetailAction.SET_MILESTONE = 'SET_MILESTONE';
IssueDetailAction.SET_ISSUE_TITLE = 'SET_ISSUE_TITLE';
IssueDetailAction.SET_ISSUE_CONTENT = 'SET_ISSUE_CONTENT';

// Promise
IssueDetailAction.UPDATE_MILESTONE = 'UPDATE_MILESTONE';
IssueDetailAction.UPDATE_LABEL_LIST = 'UPDATE_LABEL_LIST';
IssueDetailAction.UPDATE_ASSIGNEE_LIST = 'UPDATE_ASSIGNEE_LIST';
IssueDetailAction.UPDATE_ISSUE_TITLE = 'UPDATE_ISSUE_TITLE';
IssueDetailAction.UPDATE_ISSUE_CONTENT = 'UDPATE_ISSUE_CONTENT';

export default IssueDetailAction;
