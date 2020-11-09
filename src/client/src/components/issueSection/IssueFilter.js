import React, { useContext } from 'react';
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
  searchVal,
  setSearchVal,
}) {
  const { state } = useContext(UserContext);

  const handleFilters = (e) => {
    const selected = e.target.innerText;
    switch (selected) {
      case 'Open issues':
        setSearchVal('is:issue is:open');
        break;
      case 'Your issues':
        setSearchVal('is:issue is:open author:@me');
        break;
      case 'Everything assigned to you':
        setSearchVal('is:issue is:open assignee:@me');
        break;
      case 'Everything mentioning you':
        setSearchVal('is:issue is:open mentions:@me');
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
    if (value !== 'is:issue is:open') {
      setSelectFilter('');
    } else {
      setSelectFilter('Open issues');
    }
    setSearchVal(value);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      const FILTERNAME = [
        'is:issue',
        'is:open',
        'author:@me',
        'assignee:@me',
        'mentions:@me',
        'is:close',
      ];
      const FILTER = [false, false, false, false, false, false];
      const filterArray = searchVal.split(' ');
      filterArray.forEach((info) => {
        const index = FILTERNAME.indexOf(info);
        if (index !== -1) {
          FILTER[index] = true;
        }
      });
      let selected = '';
      if (FILTER[0] && FILTER[1] && FILTER[2]) {
        selected = 'Your issues';
      } else if (FILTER[0] && FILTER[1] && FILTER[3]) {
        selected = 'Everything assigned to you';
      } else if (FILTER[0] && FILTER[1] && FILTER[4]) {
        selected = 'Everything mentioning you';
      } else if (FILTER[0] && FILTER[5]) {
        selected = 'Closed issues';
      } else if (FILTER[0] && FILTER[1]) {
        selected = 'Open issues';
      } else {
        selected = 'All';
      }
      fetch(`${Http}api/issue/filter/${state.userId}/${selected}`)
        .then((res) => res.json())
        .then((data) => {
          setIssueList(data);
          setChecked(data.map(() => ''));
          setHeaderCheck({ state: '', count: 0 });
        });
    }
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
          onKeyPress={handleKeyPress}
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
  setSearchVal: PropTypes.func,
  searchVal: PropTypes.string,
};

export default IssueFilter;
