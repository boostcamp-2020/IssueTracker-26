import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputComponent from '../input/InputComponent';
import drop from '../../../public/images/drop.png';
import search from '../../../public/images/search-outline.svg';

const FilterDiv = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  border-radius: 8px;
  align-items: center;
  border: ${(props) => props.theme.Color.border} 1px solid;
  background-color: ${(props) => props.theme.Color.grayBackground};

  div:first-child {
    padding-left: 15px;
    padding-right: 15px;
    flex-basis: 70px;
    border-right: ${(props) => props.theme.Color.border} 1px solid;
    vertical-align: middle;
    border-radius: 8px 0 0 8px;
    &:hover {
      cursor: Pointer;
      background: whitesmoke;
    }

    span {
      margin-right: 7px;
    }

    img {
      width: 8px;
    }
  }

  img {
    margin: 0px 8px;
    width: 15px;
  }
`;

const SectionDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  &:focus-within {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 0 2px ${(props) => props.theme.Color.inputOutline};
  }
`;

function IssueFilter(props) {
  const { open } = props;
  return (
    <FilterDiv>
      <SectionDiv>
        <span>Filters</span>
        <img src={drop} />
      </SectionDiv>
      <SectionDiv>
        <img src={search} />
        <InputComponent
          width={'100%'}
          placeholder={'Search all issues'}
          border={'none'}
        />
      </SectionDiv>
    </FilterDiv>
  );
}

export default IssueFilter;
