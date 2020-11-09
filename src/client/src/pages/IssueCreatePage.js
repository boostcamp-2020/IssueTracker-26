import React from 'react';
import styled from 'styled-components';
import IssueForm from '../components/issueForm/IssueForm';
import IssueSubMenu from '../components/issueForm/IssueSubMenu';

const DivStyled = styled.div`
  margin: auto;
  display: flex;
  max-width: 1248px;
  width: 100%;
  height: 660px;
  border: red 1px solid;
  padding-top: 170px;
`;

function IssueCreatePage() {
  return (
    <DivStyled>
      <IssueForm />
      <IssueSubMenu />
    </DivStyled>
  );
}

export default IssueCreatePage;
