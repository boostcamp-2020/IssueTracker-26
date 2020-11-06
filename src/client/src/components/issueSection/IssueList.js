import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IssueListMenu from './IssueListMenu';
import IssueListContent from './IssueContent';

const ContainerDiv = styled.div`
  width: 100%;
  border: ${(props) => props.theme.Color.border} 1px solid;
  border-radius: 10px;
`;

function IssueList(props) {
  const { issueList } = props;

  return (
    <ContainerDiv>
      <IssueListMenu />
      <IssueListContent issueList={issueList} />
    </ContainerDiv>
  );
}

IssueList.propTypes = {
  issueList: PropTypes.array,
};

export default IssueList;
