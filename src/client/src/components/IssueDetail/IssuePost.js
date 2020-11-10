import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Shared from '../shared/sharedComponents';

const Container = styled.div`
  display: flex;
  padding-right: 0.5rem;
`;
const Profile = styled.div`
  margin-right: 2rem;
  & {
    img {
      width: 48px;
    }
  }
`;
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  align-items: center;
  width: 100%;
  border: 1px solid #dfdfdf;
`;
const Title = styled.div`
  display: flex;
  padding: 0 1rem;
  height: 60px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Author = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Controller = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Owner = styled.div`
  padding: 0.2rem 0.5rem;
  color: #6f6f6f;
  border: 1px solid #9f9f9f;
  border-radius: 0.5rem;
  cursor: default;
`;
const EditButton = styled.div`
  color: #6f6f6f;
  &:hover {
    color: #4f4f4f;
    cursor: pointer;
  }
`;
const Body = styled.div`
  padding: 1rem 1rem;
  min-height: 140px;
  width: 100%;
  border-top: 1px solid #dfdfdf;
`;

const Pre = styled.pre`
  font-family: inherit;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
`;

const Bold = styled(Shared.Span)`
  color: #0f0f0f;
  font-weight: 700;
`;

const Arrow = styled.div`
  position: absolute;
  top: 16px;
  left: -8px;
  height: 16px;
  width: 16px;
  background-color: white;
  border-left: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  transform: rotate(45deg);
`;

function IssuePost({ image }) {
  return (
    <Container>
      <Profile>
        <img src={image} />
      </Profile>
      <Content>
        <Title>
          <Arrow />
          <Author>
            <Bold>sejungKim</Bold>
            <Shared.Span>commented 3 days ago</Shared.Span>
          </Author>
          <Controller>
            <Owner>Owner</Owner>
            <EditButton>Edit</EditButton>
          </Controller>
        </Title>
        <Body>
          <Pre>레이블 전체 목록을 볼 수 있어야 한다. 줄 까지 보입니다.</Pre>
        </Body>
      </Content>
    </Container>
  );
}

IssuePost.propTypes = {
  image: PropTypes.string,
};

export default IssuePost;
