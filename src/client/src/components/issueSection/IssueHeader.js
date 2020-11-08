import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IssueFilter from './IssueFilter';
import LabelMilestoneButton from '../LabelMilestoneButton';
import Button from '../Button';
import Http from '../../util/http-common';

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 100px;
  div:first-child {
    width: 100%;
  }
`;

function IssueHeader() {
  const [issueCount, setIssueCount] = useState([]);
  const [milestoneCount, setMilestoneCount] = useState([]);
  const [stateFilterMenu, setStateFilterMenu] = useState(false);

  const handleFilterMenu = () => {
    setStateFilterMenu(!stateFilterMenu);
  };

  useEffect(() => {
    fetch(`${Http}api/label/total`)
      .then((res) => res.json())
      .then((data) => setIssueCount(data.count));
  }, []);

  useEffect(() => {
    fetch(`${Http}api/milestone/total`)
      .then((res) => res.json())
      .then((data) => setMilestoneCount(data.count));
  }, []);

  return (
    <HeaderDiv>
      <div>
        <IssueFilter
          handleFilterMenu={handleFilterMenu}
          stateFilterMenu={stateFilterMenu}
        />
      </div>
      <div>
        <LabelMilestoneButton
          page={'issue'}
          labelCnt={parseInt(issueCount, 10)}
          milestoneCnt={parseInt(milestoneCount, 10)}
        />
      </div>
      <div>
        <Link to={'/issue-create'}>
          <Button height={'32px'}>New Isssue</Button>
        </Link>
      </div>
    </HeaderDiv>
  );
}

IssueHeader.propTypes = {};

export default IssueHeader;
