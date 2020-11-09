import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  width: 100%;
  border: ${(props) => props.theme.Color.border} 1px solid;
  border-radius: 10px;
`;

function MilestoneList() {
  return <ContainerDiv></ContainerDiv>;
}

export default MilestoneList;
