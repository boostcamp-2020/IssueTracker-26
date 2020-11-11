import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import IssueDetailPresenter from './IssueDetailPresenter';
import IssueDetailReducer from './reducer';
import { TransferTime } from '../../util/time';
import IssueDetailContext from '../Context/IssueDetailContext';

function IssueDetailContainer({ issue }) {
  const {
    id,
    title,
    content,
    username,
    profile,
    user_id: userId,
    state: issueState,
    createdat: createdAt,
    comment,
    milestone,
    assignee,
    label: labelList,
  } = issue;

  const label = labelList.map(
    ({ labelid, title: labelTitle, description, color }) => ({
      id: labelid,
      title: labelTitle,
      description,
      color,
    }),
  );
  const milestoneObj = milestone.length
    ? {
        id: milestone[0].id,
        title: milestone[0].title,
        ratio: milestone[0].ratio,
      }
    : { id: undefined, title: undefined, ratio: undefined };
  const initialState = {
    issue: {
      id,
      title,
      content,
      state: issueState,
      time: TransferTime(createdAt),
    },
    user: {
      id: userId,
      name: username,
      profile,
    },
    label,
    assignee,
    comment,
    milestone: milestoneObj,
    input: {
      value: '',
    },
  };
  const [state, dispatch] = useReducer(IssueDetailReducer, initialState);
  return (
    <IssueDetailContext.Provider value={{ state, dispatch }}>
      <IssueDetailPresenter issue={issue} />
    </IssueDetailContext.Provider>
  );
}

IssueDetailContainer.propTypes = {
  issue: PropTypes.object,
};

export default IssueDetailContainer;
