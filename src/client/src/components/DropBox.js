import React from 'react';
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

const StyleUl = styled.ul`
  width: ${(props) => props.width};
  border: ${(props) => props.theme.Color.border} 1px solid;
  box-shadow: 0px 0px 10px #bcbcbc;
  border-radius: 10px;
`;

const StyleLi = styled.li`
  height: 33px;
  list-style-type: none;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${changeStyle}
`;

function DropBox({ title = '제목없음', data, width = '300px', handler }) {
  const list = data.map((info, index) => (
    <StyleLi key={index} width={width} onClick={handler}>
      {info}
    </StyleLi>
  ));
  return (
    <StyleUl width={width}>
      <StyleLi title={title}>{title}</StyleLi>
      {list}
    </StyleUl>
  );
}

DropBox.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  width: PropTypes.string,
  handler: PropTypes.func.isRequired,
};

export default DropBox;
