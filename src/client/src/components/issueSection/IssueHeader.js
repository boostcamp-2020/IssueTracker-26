import React from 'react';
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
  return (
    <HeaderDiv>
      <div>
        <IssueFilter />
      </div>
      <div>
        <LabelMilestoneButton page={'issue'} labelCnt={3} milestoneCnt={12} />
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
