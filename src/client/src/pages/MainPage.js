import React from 'react';
import styled from 'styled-components';
import IssueSection from '../components/issueSection/IssueSection';

const DivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MainPage() {
  return (
    <DivStyled>
      <IssueSection />
    </DivStyled>
  );
}

export default MainPage;
