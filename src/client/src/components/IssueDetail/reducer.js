import IssueDetailAction from './action';
import issueAPI from '../../util/api/issue';

// Promise
function updateIssueContent(state, action) {
  const { issue } = state;
  const { content, dispatch } = action;
  if (!content) return state;
  issueAPI.updateIssueContent(issue.id, content).then((status) => {
    if (status === 200)
      dispatch({ type: IssueDetailAction.SET_ISSUE_CONTENT, content });
  });
  return state;
}

function updateIssueTitle(state, action) {
  const { issue } = state;
  const { value, dispatch } = action;
  if (!value) return state;
  issueAPI.updateIssueTitle(issue.id, value).then((status) => {
    if (status === 200)
      dispatch({ type: IssueDetailAction.SET_ISSUE_TITLE, title: value });
  });
  return state;
}

function updateAssigneeList(state, action) {
  const { issue, assignee: assignees } = state;
  const { assignee: newAssignee, dispatch } = action;
  if (
    newAssignee &&
    assignees.find((assignee) => newAssignee.id === assignee.id)
  )
    return state;
  const newAssigneeList = newAssignee ? [...assignees, newAssignee] : [];
  issueAPI
    .updateAssigneeList(
      issue.id,
      newAssigneeList.map((data) => data.id),
    )
    .then((status) => {
      if (status === 200)
        dispatch({
          type: IssueDetailAction.SET_ASSIGNEE_LIST,
          assignee: newAssigneeList,
        });
    });
  return state;
}

function updateLabelList(state, action) {
  const { issue, label: labels } = state;
  const { label: newLabel, dispatch } = action;
  if (newLabel && labels.find((label) => newLabel.id === label.id))
    return state;

  const newLabelList = newLabel ? [...labels, newLabel] : [];
  issueAPI
    .updateLabelList(
      issue.id,
      newLabelList.map((data) => data.id),
    )
    .then((status) => {
      if (status === 200)
        dispatch({
          type: IssueDetailAction.SET_LABEL_LIST,
          label: newLabelList,
        });
    });
  return state;
}

function updateMilestone(state, action) {
  const { issue } = state;
  const { milestone, dispatch } = action;
  issueAPI
    .updateMilestone(issue.id, milestone ? milestone.id : null)
    .then((data) => {
      if (!data) return;
      dispatch({
        type: IssueDetailAction.SET_MILESTONE,
        milestone: data[0],
      });
    });
  return state;
}

// Set state
function applyMilestone(state, action) {
  return {
    ...state,
    milestone: { ...action.milestone },
  };
}
function applyLabelList(state, action) {
  return {
    ...state,
    label: [...action.label],
  };
}
function applyAssigneeList(state, action) {
  return {
    ...state,
    assignee: [...action.assignee],
  };
}

function applyIssueTitle(state, action) {
  return {
    ...state,
    issue: {
      ...state.issue,
      title: action.title,
    },
  };
}

function applyIssueContent(state, action) {
  return {
    ...state,
    issue: {
      ...state.issue,
      content: action.content,
    },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case IssueDetailAction.SET_MILESTONE:
      return applyMilestone(state, action);
    case IssueDetailAction.UPDATE_MILESTONE:
      return updateMilestone(state, action);
    case IssueDetailAction.UPDATE_LABEL_LIST:
      return updateLabelList(state, action);
    case IssueDetailAction.SET_LABEL_LIST:
      return applyLabelList(state, action);
    case IssueDetailAction.SET_ASSIGNEE_LIST:
      return applyAssigneeList(state, action);
    case IssueDetailAction.UPDATE_ASSIGNEE_LIST:
      return updateAssigneeList(state, action);
    case IssueDetailAction.UPDATE_ISSUE_TITLE:
      return updateIssueTitle(state, action);
    case IssueDetailAction.SET_ISSUE_TITLE:
      return applyIssueTitle(state, action);
    case IssueDetailAction.UPDATE_ISSUE_CONTENT:
      return updateIssueContent(state, action);
    case IssueDetailAction.SET_ISSUE_CONTENT:
      return applyIssueContent(state, action);

    default:
      return state;
  }
}

export default reducer;
