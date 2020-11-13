import React from 'react';
import PropTypes from 'prop-types';
import IssueDetailContainer from './IssueDetailContainer';

function IssueDetail({ issue }) {
  return <IssueDetailContainer issue={issue} />;
}

IssueDetail.propTypes = {
  issue: PropTypes.object,
};

export default IssueDetail;
