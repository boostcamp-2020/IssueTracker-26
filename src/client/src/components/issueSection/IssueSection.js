import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IssueHeader from './IssueHeader';
import IssueList from './IssueList';

const IssueContainer = styled.div`
  padding: 0px 200px;
`;

function IssueSection() {
  const [issueList, setIssueList] = useState([]);

  useEffect(() => {
    fetch('http://115.85.182.96:3000/api/issue')
      .then((res) => res.json())
      .then((data) => setIssueList(data));
  }, []);

  return (
    <IssueContainer>
      <IssueHeader />
      <IssueList issueList={issueList} />
    </IssueContainer>
  );
}

export default IssueSection;
