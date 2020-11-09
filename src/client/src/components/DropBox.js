import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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

const StyleDiv = styled.div`
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

function DropBox({
  title = '제목없음',
  data,
  width = '300px',
  height = '30px',
  handler,
  handleCloseMenu,
  top,
  bottom,
  left,
  right,
}) {
  const list = data.map((info, index) => (
    <StyleLi key={index} width={width} onClick={handler} height={height}>
      {info}
    </StyleLi>
  ));
  return (
    <Fragment>
      <StyleDiv onClick={handleCloseMenu}></StyleDiv>
      <StyleUl
        width={width}
        top={top}
        bottom={bottom}
        left={left}
        right={right}
      >
        <StyleLi title={title} height={height}>
          {title}
        </StyleLi>
        {list}
      </StyleUl>
    </Fragment>
  );
}

DropBox.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  handler: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
};

export default DropBox;
