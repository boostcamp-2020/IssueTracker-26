import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MilestoneHeader from './MilestoneHeader';

const MilestoneContainer = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;
`;

function MilestoneSection() {
  return (
    <MilestoneContainer>
      <MilestoneHeader />
    </MilestoneContainer>
  );
}

export default MilestoneSection;
