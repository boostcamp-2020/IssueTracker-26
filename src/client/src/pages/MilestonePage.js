import React from 'react';
import styled from 'styled-components';
import MilestoneSection from '../components/milestoneSection/MilestoneSection';

const DivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MilestonePage() {
  return (
    <DivStyled>
      <MilestoneSection />
    </DivStyled>
  );
}

export default MilestonePage;
