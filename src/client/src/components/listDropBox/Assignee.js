import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropBox from '../DropBox';
import userImage from '../../../public/images/user.png';
import Http from '../../util/http-common';

function Assignee({
  handleCloseMenu,
  handleAssigneeMenu,
  right,
  left,
  top,
  width = '300px',
  title = 'Filter by who`s assigned',
  height = '35px',
}) {
  const [userList, setUseruList] = useState([]);
  useEffect(() => {
    fetch(`${Http}api/user/all`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.map((userInfo) => {
          const user = userInfo;
          if (userInfo.profile === null) user.profile = userImage;
          return (
            <>
              <img src={user.profile} />{' '}
              <span data-id={user.id}>{user.userName}</span>
            </>
          );
        });
        setUseruList(list);
      });
  }, []);

  return (
    <DropBox
      title={title}
      data={userList}
      width={width}
      right={right}
      left={left}
      top={top}
      height={height}
      handleCloseMenu={handleCloseMenu}
      handler={handleAssigneeMenu}
    ></DropBox>
  );
}

Assignee.propTypes = {
  handleCloseMenu: PropTypes.func,
  handleAssigneeMenu: PropTypes.func,
  right: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
};

export default Assignee;
