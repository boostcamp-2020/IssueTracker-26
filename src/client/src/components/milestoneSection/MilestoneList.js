import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MilestoneListMenu from './MilestoneListMenu';
import MilestoneListContent from './MilestoneListContent';
import Http from '../../util/http-common';

const ContainerDiv = styled.div`
  width: 100%;
  border: ${(props) => props.theme.Color.border} 1px solid;
  border-radius: 10px;
`;

function MilestoneList() {
  const [milestones, setMilestones] = useState([]);
  const [isOpenView, setIsOpenView] = useState(true);

  const getTypeMilestone = (type) =>
    milestones.filter((x) => (type ? x.state : !x.state));

  useEffect(() => {
    fetch(`${Http}api/milestone/`)
      .then((res) => res.json())
      .then((data) => setMilestones(data.milestones));
  }, []);

  return (
    <ContainerDiv>
      <MilestoneListMenu
        milestones={milestones}
        isOpenView={isOpenView}
        setIsOpenView={setIsOpenView}
      />
      <MilestoneListContent
        milestones={getTypeMilestone(isOpenView)}
        setMilestones={setMilestones}
      />
    </ContainerDiv>
  );
}

export default MilestoneList;
