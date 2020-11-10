import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropBox from '../DropBox';
import Http from '../../util/http-common';

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
}) {
  const [labelList, setLabeluList] = useState([]);
  useEffect(() => {
    fetch(`${Http}api/label`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.map((label) => {
          return (
            <>
              <StyleDiv>
                <StyleSubDiv>
                  <StyleSpan style={{ background: label.color }}></StyleSpan>
                  <span data-id={label.id}>{label.title}</span>
                </StyleSubDiv>
                <StyleContentDiv>
                  <span>{label.description}</span>
                </StyleContentDiv>
              </StyleDiv>
            </>
          );
        });
        setLabeluList(list);
      });
  }, []);

  return (
    <DropBox
      title={title}
      data={labelList}
      width={width}
      height={'35px'}
      right={right}
      top={top}
      handleCloseMenu={handleCloseMenu}
      handler={handleLabelMenu}
    ></DropBox>
  );
}

Label.propTypes = {
  handleCloseMenu: PropTypes.func,
  handleLabelMenu: PropTypes.func,
  right: PropTypes.number,
  top: PropTypes.number,
  title: PropTypes.string,
  width: PropTypes.string,
};

export default Label;
