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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  width: 100%;
  padding: 10rem 15% 0 15%;
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
  background-color: ${(props) => props.theme.Color.lightGreen};
  padding: 0 1rem;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 3;
`;
const Side = styled.div`
  flex: 1;
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
          <IssueState>Open</IssueState>
          <IssueInfo>
            <Bold>{user.name}</Bold>
            <Shared.Span>opened {issue.time}</Shared.Span>
            <Shared.Span>1 comment</Shared.Span>
          </IssueInfo>
        </HeaderState>
      </Header>
      <Body>
        <Content>
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
