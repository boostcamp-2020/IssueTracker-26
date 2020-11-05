import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Time from '../../util/time';

const ContainerDiv = styled.div`
  width: 100%;
  border: red 1px solid;
`;

const ContentDiv = styled.div`
  display: flex;
  height: 80px;
  border: red 1px solid;

  div {
    width: 120px;
    border: red 1px solid;
  }

  div:first-child {
    width: 70px;
  }

  div:nth-child(2) {
    width: 100%;
    display: flex;
    flex-direction: column;
    div:first-child {
      width: 100%;
      flex-grow: 1.3;
    }

    div:nth-child(2) {
      flex-grow: 0.7;
    }
  }
`;

const TitleSpan = styled.span`
  font-weight: bold;
`;

function IssueList(props) {
  const { issueList } = props;
  console.log(issueList);
  const list = issueList.map((issue, index) => (
    <ContentDiv key={index}>
      <div>
        <input type="checkbox" />
      </div>
      <div>
        <div>
          <TitleSpan>{issue.title}</TitleSpan>
          {issue.label.map((label, indexs) => (
            <span key={indexs}>{label.title}</span>
          ))}
        </div>
        <div>
          {issue.content}
          {Time(issue.createdat)}
          {issue.milestonename}
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        {issue.assignee.map((assignee, aIndex) => (
          <span key={aIndex}>{assignee.username}</span>
        ))}
      </div>
    </ContentDiv>
  ));
  return (
    <ContainerDiv>
      <ContentDiv>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <span>Author</span>
        </div>
        <div>
          <span>Lavel</span>
        </div>
        <div>
          <span>Milstones</span>
        </div>
        <div>
          <span>Assignee</span>
        </div>
      </ContentDiv>
      {list}
    </ContainerDiv>
  );
}

IssueList.propTypes = {
  issueList: PropTypes.array,
};

export default IssueList;
