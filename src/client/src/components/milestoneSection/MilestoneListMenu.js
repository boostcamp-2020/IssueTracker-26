import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import closed from '../../../public/images/check.svg';
import open from '../../../public/images/issue-milestone.svg';

const MenuDiv = styled.div`
  display: flex;
  border-radius: 10px;
  height: 50px;
  padding-top: 15px;
  padding-right: 15px;
  font-size: 0.9rem;
  background: ${(props) => props.theme.Color.grayBackground};
  text-align: center;
  color: #586069;

  div {
    position: relative;
    width: 100px;

    &:hover {
      color: black;
      cursor: pointer;
    }
  }

  img {
    width: 12px;
    margin-right: 5px;
    filter: invert(38%) sepia(4%) saturate(1346%) hue-rotate(172deg)
      brightness(91%) contrast(84%);
  }
`;

function MilestoneListMenu(props) {
  const { milestones } = props;
  const [openMilestoneCnt, setOpenMilestoneCnt] = useState(0);
  const [closeMilestoneCnt, setCloseMilestoneCnt] = useState(0);

  const setMilestoneCnt = () => {
    let openCnt = 0;
    let closeCnt = 0;

    milestones.forEach((milestone) => {
      if (milestone.state) openCnt += 1;
      else closeCnt += 1;
    });

    setOpenMilestoneCnt(openCnt);
    setCloseMilestoneCnt(closeCnt);
  };

  useEffect(() => {
    setMilestoneCnt();
  }, [milestones]);

  return (
    <MenuDiv>
      <div>
        <img src={open} />
        {openMilestoneCnt} Open
      </div>
      <div>
        <img src={closed} />
        {closeMilestoneCnt} Closed
      </div>
    </MenuDiv>
  );
}

MilestoneListMenu.propTypes = {
  milestones: PropTypes.array,
};

export default MilestoneListMenu;
