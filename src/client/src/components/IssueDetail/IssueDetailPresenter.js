import React from 'react';
import styled from 'styled-components';
import UserImage from '../../../public/images/user.png';
import Shared from '../shared/sharedComponents';
import IssuePost from './IssuePost';

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
const EditButton = styled.button`
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme.Color.lightGrayBackground};
  border: 1px solid #dbdbdb;
  outline: none;
  &:hover {
    background-color: #f4f5f6;
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
  flex: 3;
`;
const Side = styled.div`
  flex: 1;
`;
const Assignee = styled.div``;
const Label = styled.div``;
const Milestone = styled.div``;

const Bold = styled(Shared.Span)`
  font-weight: 800;
`;

function IssueDetailPresenter() {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <Title>
            레이블 목록 보기 구현 <Shared.Span>#1</Shared.Span>
          </Title>
          <EditButton>Edit</EditButton>
        </HeaderTitle>
        <HeaderState>
          <IssueState>Open</IssueState>
          <IssueInfo>
            <Bold>sejungkim</Bold>
            <Shared.Span>opened this issue 3 days ago</Shared.Span>
            <Shared.Span>1 comment</Shared.Span>
          </IssueInfo>
        </HeaderState>
      </Header>
      <Body>
        <Content>
          <IssuePost image={UserImage} />
        </Content>
        <Side>
          <Assignee>어사이니 등록</Assignee>
          <Label>레이블 등록</Label>
          <Milestone>마일스톤 등록</Milestone>
        </Side>
      </Body>
    </Container>
  );
}

export default IssueDetailPresenter;
