import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputComponent from '../input/InputComponent';
import drop from '../../../public/images/drop.png';
import DropBox from '../DropBox';
import search from '../../../public/images/search-outline.svg';
import Http from '../../util/http-common';
import UserContext from '../Context/UserContext';

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

function IssueFilter({
  handleFilterMenu,
  stateFilterMenu,
  setIssueList,
  setChecked,
  setHeaderCheck,
  setSelectFilter,
}) {
  const [searchVal, setSearchVal] = useState('is:issue is:open');
  const { state } = useContext(UserContext);

  const handleFilters = (e) => {
    const selected = e.target.innerText;
    switch (selected) {
      case 'Open issues':
        setSearchVal('is:issue is:open');
        break;
      case 'Your issues':
        setSearchVal('is:open is:issue author:@me');
        break;
      case 'Everything assigned to you':
        setSearchVal('is:open assignee:@me');
        break;
      case 'Everything mentioning you':
        setSearchVal('is:open mentions:@me');
        break;
      case 'Closed issues':
        setSearchVal('is:issue is:close');
        break;
      default:
        setSearchVal('');
        break;
    }
    setSelectFilter(selected);
    fetch(`${Http}api/issue/filter/${state.userId}/${selected}`)
      .then((res) => res.json())
      .then((data) => {
        setIssueList(data);
        setChecked(data.map(() => ''));
        setHeaderCheck({ state: '', count: 0 });
      });
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
  setIssueList: PropTypes.func,
  setChecked: PropTypes.func,
  setHeaderCheck: PropTypes.func,
  setSelectFilter: PropTypes.func,
};

export default IssueFilter;
