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
      <IssueHeader />
      <IssueList
        issueList={issueList}
        checkList={checkList}
        setChecked={setChecked}
      />
    </IssueContainer>
  );
}

export default IssueSection;
