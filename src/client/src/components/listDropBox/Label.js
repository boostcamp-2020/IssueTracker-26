import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
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

const StyleDiv = styled.div`
  display: flex;
  width: 100% !important;
  height: 100% !important;
  flex-direction: column;
  justify-content: center;
`;

const StyleSubDiv = styled.div`
  display: flex;
  text-align: left;
`;

const StyleContentDiv = styled.div`
  text-align: left;
  margin-left: 30px;
`;

const StyleSpan = styled.span`
  display: inline-block;
  width: 20px !important;
  height: 20px !important;
  border-radius: 10px;
  margin-right: 10px;
`;

function Label({
  handleCloseMenu,
  handleLabelMenu,
  right,
  top,
  title = 'Filter by label',
  width = '300px',
  subtitle,
}) {
  const [labelList, setLabeluList] = useState([]);
  useEffect(() => {
    fetch(`${Http}api/label`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.map((label, index) => {
          return (
            <StyleLi
              key={index}
              width={width}
              onClick={() => handleLabelMenu(label, 'Label')}
            >
              <StyleDiv>
                <StyleSubDiv>
                  <StyleSpan style={{ background: label.color }}></StyleSpan>
                  <span data-id={label.id}>{label.title}</span>
                </StyleSubDiv>
                <StyleContentDiv>
                  <span>{label.description}</span>
                </StyleContentDiv>
              </StyleDiv>
            </StyleLi>
          );
        });
        setLabeluList(list);
      });
  }, []);

  return (
    <>
      <StyleUlDiv onClick={handleCloseMenu}></StyleUlDiv>
      <StyleUl width={width} top={top} right={right}>
        <StyleLi title={title}>{title}</StyleLi>
        <StyleLiSub onClick={() => handleLabelMenu(null)} subtitle={subtitle}>
          {subtitle}
        </StyleLiSub>
        {labelList}
      </StyleUl>
    </>
  );
}

Label.propTypes = {
  handleCloseMenu: PropTypes.func,
  handleLabelMenu: PropTypes.func,
  right: PropTypes.number,
  top: PropTypes.number,
  title: PropTypes.string,
  width: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Label;
