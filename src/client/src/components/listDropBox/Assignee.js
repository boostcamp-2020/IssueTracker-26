import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import userImage from '../../../public/images/user.png';
import Http from '../../util/http-common';

const changeStyle = css`
  ${(props) => {
    return props.title
      ? `
          padding-left: 10px;
          background: ${props.theme.Color.grayBackground};
          border-radius: 10px 10px 0 0;
        `
      : `
          border-top: ${props.theme.Color.border} 1px solid;
          background: white;
          padding-left: 30px;
          color: #747474;
          &:hover {
            cursor: Pointer;
            background: ${props.theme.Color.grayBackground};
          }
          &:last-child {
            border-radius: 0 0 10px 10px;
          }
        `;
  }}
`;

const StyleUlDiv = styled.div`
  cursor: default;
  z-index: 10;
  position: fixed !important;
  max-width: 100%;
  max-height: 100%;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: auto;
  right: 0;
  top: 0;
`;

const StyleUl = styled.ul`
  cursor: default;
  position: absolute;
  margin-top: 7px;
  top: ${(props) => props.top}px;
  bottom: ${(props) => props.bottom}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
  z-index: 1000;
  width: ${(props) => props.width};
  border: ${(props) => props.theme.Color.border} 1px solid;
  box-shadow: 0px 0px 10px #bcbcbc;
  border-radius: 5px;
`;

const StyleLi = styled.li`
  color: black;
  padding: 8px 0 8px 0;
  list-style-type: none;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    border-radius: 10px;
    width: 20px !important;
    filter: none !important;
    margin-right: 10px;
  }
  ${changeStyle}
`;

const StyleLiSub = styled.li`
  color: black;
  padding: 8px 0 8px 0;
  list-style-type: none;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    border-radius: 10px;
    width: 20px !important;
    filter: none !important;
    margin-right: 10px;
  }
  ${changeStyle}
  font-size: 11px;
  color: black;
`;

function Assignee({
  handleCloseMenu,
  handleAssigneeMenu,
  right,
  top,
  width = '300px',
  title = 'Filter by who`s assigned',
  subtitle,
}) {
  const [userList, setUseruList] = useState([]);
  useEffect(() => {
    fetch(`${Http}api/user/all`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.map((userInfo, index) => {
          const user = userInfo;
          if (userInfo.profile === null) user.profile = userImage;
          return (
            <StyleLi
              key={index}
              width={width}
              onClick={() => handleAssigneeMenu(userInfo)}
            >
              <img src={user.profile} />{' '}
              <span data-id={user.id}>{user.userName}</span>
            </StyleLi>
          );
        });
        setUseruList(list);
      });
  }, []);

  return (
    <>
      <StyleUlDiv onClick={handleCloseMenu}></StyleUlDiv>
      <StyleUl width={width} top={top} right={right}>
        <StyleLi title={title}>{title}</StyleLi>
        <StyleLiSub
          onClick={() => handleAssigneeMenu(null)}
          subtitle={subtitle}
        >
          {subtitle}
        </StyleLiSub>
        {userList}
      </StyleUl>
    </>
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
  subtitle: PropTypes.string,
};

export default Assignee;
