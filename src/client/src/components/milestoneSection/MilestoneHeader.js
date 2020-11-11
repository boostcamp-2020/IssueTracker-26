import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LabelMilestoneButton from '../LabelMilestoneButton';
import Button from '../Button';

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 100px;
  margin-bottom: -10px;
  div {
    padding: 2em 0em;
  }
  div:first-child {
    width: 100%;
  }
`;

function MilestoneHeader() {
  return (
    <HeaderDiv>
      <div>
        <LabelMilestoneButton page={'milestone'} />
      </div>
      <div>
        <Link to={'/milestone-create'}>
          <Button height={'32px'} width={'120px'}>
            New milestone
          </Button>
        </Link>
      </div>
    </HeaderDiv>
  );
}

export default MilestoneHeader;
