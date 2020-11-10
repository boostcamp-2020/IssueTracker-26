import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropBox from '../DropBox';
import Http from '../../util/http-common';

function Milstone({
  handleCloseMenu,
  handleMilstonsMenu,
  right,
  top,
  title = 'Filter by milestone',
  width,
}) {
  const [milestoneList, setMilestoneuList] = useState([]);
  useEffect(() => {
    fetch(`${Http}api/milestone/all`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.map((milestone) => {
          return (
            <>
              <span data-id={milestone.id}>{milestone.title}</span>
            </>
          );
        });
        setMilestoneuList(list);
      });
  }, []);

  return (
    <DropBox
      title={title}
      data={milestoneList}
      width={width}
      height={'35px'}
      right={right}
      top={top}
      handleCloseMenu={handleCloseMenu}
      handler={handleMilstonsMenu}
    ></DropBox>
  );
}

Milstone.propTypes = {
  handleCloseMenu: PropTypes.func,
  handleMilstonsMenu: PropTypes.func,
  right: PropTypes.number,
  top: PropTypes.number,
  title: PropTypes.string,
  width: PropTypes.string,
};

export default Milstone;
