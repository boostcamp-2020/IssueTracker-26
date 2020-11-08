import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputComponent from '../input/InputComponent';
import drop from '../../../public/images/drop.png';
import DropBox from '../DropBox';
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
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  &:focus-within {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 0 2px ${(props) => props.theme.Color.inputShadow};
  }

  & {
    input {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &:hover {
    cursor: Pointer;
    background: whitesmoke;
  }
`;

function IssueFilter({ handleFilterMenu, stateFilterMenu }) {
  const [searchVal, setSearchVal] = useState('is:issue is:open');

  const handleFilters = (e) => {
    const selected = e.target.innerText;
    switch (selected) {
      case 'Open issues':
        return setSearchVal('is:issue is:open');
      case 'Your issues':
        return setSearchVal('is:open is:issue author:@me');
      case 'Everything assigned to you':
        return setSearchVal('is:open assignee:@me');
      case 'Everything mentioning you':
        return setSearchVal('is:open mentions:@me');
      case 'Closed issues':
        return setSearchVal('is:issue is:close');
      default:
        return setSearchVal('');
    }
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setSearchVal(value);
  };

  return (
    <FilterDiv>
      <SectionDiv onClick={handleFilterMenu}>
        <span>Filters</span>
        <img src={drop} />
        {stateFilterMenu && (
          <DropBox
            title={'Filter Issues'}
            data={[
              'Open issues',
              'Your issues',
              'Everything assigned to you',
              'Everything mentioning you',
              'Closed issues',
            ]}
            handler={handleFilters}
            handleCloseMenu={handleFilterMenu}
            top={35}
            left={0}
          ></DropBox>
        )}
      </SectionDiv>
      <SectionDiv>
        <img src={search} />
        <InputComponent
          width={'100%'}
          height={'32px'}
          placeholder={'Search all issues'}
          border={'none'}
          value={searchVal}
          outlineColor={'none'}
          onChange={handleInput}
          bgColor={'#f6f8fa'}
        />
      </SectionDiv>
    </FilterDiv>
  );
}

IssueFilter.propTypes = {
  handleFilterMenu: PropTypes.func,
  stateFilterMenu: PropTypes.bool,
};

export default IssueFilter;
