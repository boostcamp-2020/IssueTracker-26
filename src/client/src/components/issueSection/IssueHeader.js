import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IssueFilter from './IssueFilter';
import LabelMilestoneButton from '../LabelMilestoneButton';
import Button from '../Button';

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

  useEffect(() => {
    fetch('http://115.85.182.96:3000/api/label/total')
      .then((res) => res.json())
      .then((data) => setIssueCount(data.count));
  }, []);

  useEffect(() => {
    fetch('http://115.85.182.96:3000/api/milestone/total')
      .then((res) => res.json())
      .then((data) => setMilestoneCount(data.count));
  }, []);

  return (
    <HeaderDiv>
      <div>
        <IssueFilter />
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
          <Button height={'32px'}>New Issue</Button>
        </Link>
      </div>
    </HeaderDiv>
  );
}

IssueHeader.propTypes = {};

export default IssueHeader;
