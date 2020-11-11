import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import UserImage from '../../../public/images/user.png';
import Shared from '../shared/sharedComponents';
import IssuePost from './IssuePost';
import IssueSideMenu from './IssueSideMenu';
import IssueDetailContext from '../Context/IssueDetailContext';
import IssueDetailAction from './action';
import Input from '../input/InputComponent';
import { TransferTime } from '../../util/time';
import Comment from '../commentSection/index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  min-height: 1248px;
  max-width: 1248px;
  width: 100%;
  padding: 10rem 0 5rem 0;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  flex: 1;
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
`;
const HeaderTitle = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;
const HeaderState = styled.div`
  flex: 1;
  display: flex;
`;
const IssueState = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-right: 0.5rem;
  background-color: ${(props) =>
    props.state ? props.theme.Color.lightGreen : '#FF5050'};
  padding: 0.4rem 1rem;
  border-radius: 1.2rem;
`;
const IssueInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Title = styled.h1`
  font-weight: 600;
`;

const EditButton = styled(Shared.Button)`
  background-color: ${(props) => props.theme.Color.lightGrayBackground};
  border: 1px solid #dbdbdb;
  &:hover {
    background-color: #f4f5f6;
    border: 1px solid #cbcbcb;
    cursor: pointer;
  }
`;

const SubmitButton = styled(Shared.Button)`
  color: white;
  background-color: ${(props) => props.theme.Color.lightGreen};
  border: 1px solid #dbdbdb;
  &:hover {
    background-color: #237a3d;
    border: 1px solid #cbcbcb;
    cursor: pointer;
  }
`;

const Body = styled.div`
  display: flex;
  padding-top: 2rem;
  flex: 5;
`;
const Content = styled.div`
  flex-grow: 1;
  max-width: 830px;
`;
const Side = styled.div`
  flex-basis: 312px;
`;

const Bold = styled(Shared.Span)`
  font-weight: 800;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 15%;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const IssuePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 1rem;
`;
const CommentContainer = styled.div`
  padding-top: 1rem;
`;

function IssueDetailPresenter() {
  const { state, dispatch } = useContext(IssueDetailContext);
  const { issue, user, assignee, label, milestone, comment } = state;
  const [title, setTitle] = useState(state.issue.title);
  const [isTitleEdit, setTitleEdit] = useState(false);
  const TYPE = { issue: 'issue', comment: 'comment' };

  const handleInput = (e) => setTitle(e.target.value);
  return (
    <Container>
      <Header>
        <HeaderTitle>
          {isTitleEdit ? (
            <Input
              height={'42px'}
              width={'85%'}
              onChange={handleInput}
              value={title}
            />
          ) : (
            <Title>
              {issue.title}
              <Shared.Span>#{issue.id}</Shared.Span>
            </Title>
          )}
          {isTitleEdit ? (
            <ButtonContainer>
              <SubmitButton
                onClick={() => {
                  dispatch({
                    type: IssueDetailAction.UPDATE_ISSUE_TITLE,
                    value: title,
                    dispatch,
                  });
                  setTitleEdit(false);
                  setTitle(title);
                }}
              >
                수정
              </SubmitButton>
              <EditButton onClick={() => setTitleEdit(false)}>취소</EditButton>
            </ButtonContainer>
          ) : (
            <EditButton onClick={() => setTitleEdit(true)}>Edit</EditButton>
          )}
        </HeaderTitle>
        <HeaderState>
          <IssueState state={issue.state}>
            {issue.state ? 'Open' : 'Close'}
          </IssueState>
          <IssueInfo>
            <Bold>{user.name}</Bold>
            <Shared.Span>opened {issue.time}</Shared.Span>
            <Shared.Span>1 comment</Shared.Span>
          </IssueInfo>
        </HeaderState>
      </Header>
      <Body>
        <Content>
          <IssuePostContainer>
            <IssuePost
              author={user.id}
              id={issue.id}
              image={user.profile || UserImage}
              content={issue.content}
              username={user.name}
              time={issue.time}
              textAreaVal={issue.content}
              type={TYPE.issue}
            />
            {comment.map((data, index) => {
              const {
                id,
                content,
                createdat,
                user_id: userId,
                username,
                profile,
              } = data;
              return (
                <IssuePost
                  key={index}
                  id={id}
                  author={userId}
                  image={profile || UserImage}
                  content={content}
                  username={username}
                  time={TransferTime(createdat)}
                  textAreaVal={content}
                  type={TYPE.comment}
                />
              );
            })}
          </IssuePostContainer>
          <CommentContainer>
            <Comment />
          </CommentContainer>
        </Content>
        <Side>
          <IssueSideMenu
            selectAssignee={assignee}
            selectLabel={label}
            selectMiliestone={milestone}
          />
        </Side>
      </Body>
    </Container>
  );
}

export default IssueDetailPresenter;
