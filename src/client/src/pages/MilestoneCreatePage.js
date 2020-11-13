import React from 'react';
import styled from 'styled-components';
import MilestoneCreateSection from '../components/milestoneSection/MilestoneCreateSection';

const DivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MilestoneCreatePage() {
  return (
    <DivStyled>
      <MilestoneCreateSection />
    </DivStyled>
  );
}

export default MilestoneCreatePage;
