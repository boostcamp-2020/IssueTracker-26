import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IssueHeader from './IssueHeader';
import IssueList from './IssueList';
import Http from '../../util/http-common';

const IssueContainer = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 40px;
`;

const ClearDiv = styled.div`
  margin-top: -20px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #586069;
  &:hover {
    cursor: pointer;
    color: #0366d6;
  }
`;

function IssueSection() {
  const [issueList, setIssueList] = useState([]);
  const [listState, setListState] = useState(false);
  const [checkList, setChecked] = useState([]);
  const [selectFilter, setSelectFilter] = useState('Open issues');
  const [headerCheck, setHeaderCheck] = useState({ state: '', count: 0 });
  const [searchVal, setSearchVal] = useState('is:issue is:open');

  const handleClearFilter = () => {
    setSelectFilter('Open issues');
    fetch(`${Http}api/issue`)
      .then((res) => res.json())
      .then((data) => {
        setIssueList(data);
        setChecked(data.map(() => ''));
        setHeaderCheck({ state: '', count: 0 });
        setSearchVal('is:issue is:open');
      });
  };

  useEffect(() => {
    fetch(`${Http}api/issue`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setListState(true);
          setIssueList(data);
        }, 1000);
        setChecked(data.map(() => ''));
      });
  }, []);

  return (
    <IssueContainer>
      <IssueHeader
        setSelectFilter={setSelectFilter}
        setIssueList={setIssueList}
        setChecked={setChecked}
        setHeaderCheck={setHeaderCheck}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        setListState={setListState}
      />
      {searchVal !== 'is:issue is:open' ? (
        <ClearDiv onClick={handleClearFilter}>
          <span>Clear current search query, filters, and sorts</span>
        </ClearDiv>
      ) : (
        ''
      )}
      <IssueList
        selectFilter={selectFilter}
        issueList={issueList}
        setIssueList={setIssueList}
        checkList={checkList}
        setChecked={setChecked}
        setHeaderCheck={setHeaderCheck}
        headerCheck={headerCheck}
        listState={listState}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        setListState={setListState}
      />
    </IssueContainer>
  );
}

export default IssueSection;
