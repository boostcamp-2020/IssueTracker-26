import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import issueAPI from '../util/api/issue';
import UserContext from '../components/Context/UserContext';
import IssueDetail from '../components/IssueDetail';

function IssueDetailPage(props) {
  const history = useHistory();
  const { state } = useContext(UserContext);
  const [issue, setIssue] = useState();
  const {
    match: {
      params: { id },
    },
  } = props;
  if (!id) history.replace('/');
  useEffect(() => {
    issueAPI.getIssue(id, state.token).then((issueData) => {
      if (!issueData) return history.replace('/');
      return setIssue(issueData);
    });
  }, []);
  return <IssueDetail issue={issue} />;
}

IssueDetailPage.propTypes = {
  match: PropTypes.object,
};

export default IssueDetailPage;
