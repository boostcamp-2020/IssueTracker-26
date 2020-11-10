import React from 'react';
import styled from 'styled-components';
import MilestoneHeader from './MilestoneHeader';
import MilestoneList from './MilestoneList';

const MilestoneContainer = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;
`;

function MilestoneSection() {
  return (
    <MilestoneContainer>
      <MilestoneHeader />
      <MilestoneList />
    </MilestoneContainer>
  );
}

export default MilestoneSection;
