import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Time from '../../util/time';

const ContentDiv = styled.div`
  display: flex;
  height: 60px;
  text-align: center;
  padding-right: 15px;
  border-top: ${(props) => props.theme.Color.border} 1px solid;
  align-items: center;

  div {
    width: 120px;
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

  &:hover {
    background: ${(props) => props.theme.Color.grayBackground};
  }
`;

const TitleSpan = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: 0.9rem;
`;

const TitleDiv = styled.div`
  text-align: left;
`;

const SubTitleDiv = styled.div`
  margin-top: 7px;
  font-size: 0.7rem;
  color: #586069;
`;

const LabelSpan = styled.span`
  margin-left: 5px;
  font-weight: bold;
  font-size: 0.7rem;
  border-radius: 10px;
  background: ${(props) => props.color};
  display: inline-block;
  padding: 2px 7px 2px 7px;
`;

function IssueContent(props) {
  const { issueList } = props;
  console.log(issueList);
  const list = issueList.map((issue, index) => (
    <ContentDiv key={index}>
      <div>
        <input type="checkbox" />
      </div>
      <TitleDiv>
        <div>
          <TitleSpan>{issue.title}</TitleSpan>
          {issue.label.map((label, indexs) => (
            <LabelSpan key={indexs} color={label.color}>
              {label.title}
            </LabelSpan>
          ))}
        </div>
        <SubTitleDiv>
          <span>
            #{issue.id} opened {Time(issue.createdat)} by {issue.username}
          </span>
        </SubTitleDiv>
      </TitleDiv>
      <div></div>
      <div></div>
      <div></div>
      <div>
        {issue.assignee.map((assignee, aIndex) => (
          <span key={aIndex}>{assignee.username}</span>
        ))}
      </div>
      <div></div>
    </ContentDiv>
  ));

  return <div>{list}</div>;
}

IssueContent.propTypes = {
  issueList: PropTypes.array,
};

export default IssueContent;
