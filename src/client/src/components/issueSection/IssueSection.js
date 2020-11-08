import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IssueHeader from './IssueHeader';
import IssueList from './IssueList';
import Http from '../../util/http-common';

const IssueContainer = styled.div`
  padding: 0px 200px;
`;

function IssueSection() {
  const [issueList, setIssueList] = useState([]);
  const [checkList, setChecked] = useState([]);
  const [selectFilter, setSelectFilter] = useState('Open issues');
  const [headerCheck, setHeaderCheck] = useState({ state: '', count: 0 });

  useEffect(() => {
    fetch(`${Http}api/issue`)
      .then((res) => res.json())
      .then((data) => {
        setIssueList(data);
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
      />
      <IssueList
        selectFilter={selectFilter}
        issueList={issueList}
        setIssueList={setIssueList}
        checkList={checkList}
        setChecked={setChecked}
        setHeaderCheck={setHeaderCheck}
        headerCheck={headerCheck}
      />
    </IssueContainer>
  );
}

export default IssueSection;
