import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IssueFilter from './IssueFilter';
import LabelMilestoneButton from '../LabelMilestoneButton';
import Button from '../Button';
import Http from '../../util/http-common';

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 100px;
  margin-bottom: -10px;
  div:first-child {
    width: 100%;
  }
`;

function IssueHeader({
  setIssueList,
  setChecked,
  setHeaderCheck,
  setSelectFilter,
  searchVal,
  setSearchVal,
  setListState,
}) {
  const [issueCount, setIssueCount] = useState([]);
  const [milestoneCount, setMilestoneCount] = useState([]);
  const [stateFilterMenu, setStateFilterMenu] = useState(false);

  const handleFilterMenu = () => {
    setStateFilterMenu(!stateFilterMenu);
  };

  useEffect(() => {
    fetch(`${Http}api/label/total`)
      .then((res) => res.json())
      .then((data) => setIssueCount(data.count));
  }, []);

  useEffect(() => {
    fetch(`${Http}api/milestone/total`)
      .then((res) => res.json())
      .then((data) => setMilestoneCount(data.count));
  }, []);

  return (
    <HeaderDiv>
      <div>
        <IssueFilter
          setHeaderCheck={setHeaderCheck}
          setChecked={setChecked}
          setIssueList={setIssueList}
          handleFilterMenu={handleFilterMenu}
          stateFilterMenu={stateFilterMenu}
          setSelectFilter={setSelectFilter}
          setSearchVal={setSearchVal}
          searchVal={searchVal}
          setListState={setListState}
        />
      </div>
      <div>
        <LabelMilestoneButton
          page={'issue'}
          labelCnt={parseInt(issueCount, 10)}
          milestoneCnt={parseInt(milestoneCount, 10)}
        />
      </div>
      <div>
        <Link to={'/issue-create'}>
          <Button height={'32px'}>New Isssue</Button>
        </Link>
      </div>
    </HeaderDiv>
  );
}

IssueHeader.propTypes = {
  setIssueList: PropTypes.func,
  setChecked: PropTypes.func,
  setHeaderCheck: PropTypes.func,
  setSelectFilter: PropTypes.func,
  setSearchVal: PropTypes.func,
  searchVal: PropTypes.string,
  setListState: PropTypes.func,
};

export default IssueHeader;
