import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MilestoneEditSection from '../components/milestoneSection/MilestoneEditSection';

const DivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MilestoneEditPage(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  return (
    <DivStyled>
      <MilestoneEditSection id={id} />
    </DivStyled>
  );
}

MilestoneEditPage.propTypes = {
  match: PropTypes.object,
};

export default MilestoneEditPage;
