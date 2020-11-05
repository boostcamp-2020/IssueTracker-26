import React from 'react';
import styled from 'styled-components';
import IssueHeader from './IssueHeader';
import IssueList from './IssueList';

const IssueContainer = styled.div`
  padding: 0px 200px;
`;

function IssueSection() {
  return (
    <IssueContainer>
      <IssueHeader />
      <IssueList />
    </IssueContainer>
  );
}

export default IssueSection;
