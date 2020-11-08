import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Time from '../../util/time';
import OpenIssue from '../../../public/images/open-issue.svg';
import MilestoneImg from '../../../public/images/issue-milestone.svg';
import CommentImg from '../../../public/images/comment.svg';

const ImgStyled = styled.img`
  vertical-align: middle;
  margin-top: -3px;
  margin-right: 7px;
`;
const ContentDiv = styled.div`
  display: flex;
  height: 65px;
  text-align: center;
  padding-right: 15px;
  border-top: ${(props) => props.theme.Color.border} 1px solid;
  align-items: center;

  div {
    width: 150px;
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
  font-size: 1rem;
`;

const TitleDiv = styled.div`
  text-align: left;
`;

const SubTitleDiv = styled.div`
  margin-top: 5px;
  font-size: 0.8rem;
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

const MilestoneImgStyled = styled.img`
  filter: invert(78%) sepia(1%) saturate(958%) hue-rotate(23deg) brightness(86%)
    contrast(88%);
  margin-left: 5px;
  margin-right: 3px;
  margin-bottom: -4px;
  width: 14px;
`;

const CommentImgStyled = styled.img`
  filter: invert(39%) sepia(2%) saturate(3035%) hue-rotate(172deg)
    brightness(89%) contrast(82%);
  width: 14px;
  margin-top: 5px;
`;

const CommentSpan = styled.span`
  color: #586069;
  font-size: 0.7rem;
  font-weight: bold;
`;

function IssueContent(props) {
  const { issueList, checkList, handleSingleCheck } = props;

  const list = issueList.map((issue, index) => (
    <ContentDiv key={index}>
      <div>
        <input
          type="checkbox"
          checked={checkList[index] || ''}
          onChange={() => handleSingleCheck(index)}
        />
      </div>
      <TitleDiv>
        <div>
          <ImgStyled src={OpenIssue} />
          <TitleSpan>{issue.title}</TitleSpan>
          {issue.label.map((label, indexs) => (
            <LabelSpan key={indexs} color={label.color}>
              {label.title}
            </LabelSpan>
          ))}
        </div>
        <SubTitleDiv>
          <span>
            #{issue.id} opened {Time(issue.createdat)} by {issue.username}{' '}
            {(() => {
              if (issue.milestonename)
                return <MilestoneImgStyled src={MilestoneImg} />;
              return null;
            })()}
            {issue.milestonename}
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
      <div>
        {(() => {
          if (issue.commentCount) return <CommentImgStyled src={CommentImg} />;
          return null;
        })()}
        <CommentSpan>
          {issue.commentCount ? issue.commentCount : ''}
        </CommentSpan>
      </div>
    </ContentDiv>
  ));

  return <div>{list}</div>;
}

IssueContent.propTypes = {
  issueList: PropTypes.array,
  checkList: PropTypes.array,
  handleSingleCheck: PropTypes.func,
};

export default IssueContent;
