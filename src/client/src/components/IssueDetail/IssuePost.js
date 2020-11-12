import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Shared from '../shared/sharedComponents';
import IssueForm from './IssuePostForm';
import IssueDetailContext from '../Context/IssueDetailContext';
import UserContext from '../Context/UserContext';
import IssueDetailAction from './action';

const Container = styled.div`
  display: flex;
  padding-right: 0.5rem;
  background-color: white;
`;
const Profile = styled.div`
  margin-right: 2rem;
  & {
    img {
      border-radius: 2rem;
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
  border-radius: 0.5rem;
`;
const Title = styled.div`
  background-color: ${(props) => (props.owner ? '#EBF5FF' : 'white')};
  display: flex;
  padding: 0 1rem;
  height: 60px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
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
  background-color: ${(props) => (props.owner ? '#EBF5FF' : 'white')};
  border-left: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  transform: rotate(45deg);
`;

function IssuePost({
  id,
  author,
  image,
  content,
  username,
  time,
  textAreaVal,
  type,
}) {
  const { dispatch } = useContext(IssueDetailContext);
  const { state: user } = useContext(UserContext);
  const preRef = useRef(null);
  const action = {
    issue: IssueDetailAction.UPDATE_ISSUE_CONTENT,
    comment: IssueDetailAction.UPDATE_COMMENT_CONTENT,
  };
  const isOwner = author === user.userId;
  const [isContentEdit, setContentEdit] = useState(false);
  const [textarea, setTextarea] = useState(textAreaVal);

  useEffect(() => {
    const imgs = preRef.current.querySelectorAll('img');
    [...imgs].forEach((img) => {
      const imageEl = img;
      imageEl.onload = () => {
        if (imageEl.width >= imageEl.height) {
          imageEl.style.width = '500px';
          imageEl.style.height = 'auto';
        } else {
          imageEl.style.height = '500px';
          imageEl.style.width = 'auto';
        }
      };
    });
  }, [content]);
  return isContentEdit ? (
    <IssueForm
      setContentEdit={() => setContentEdit(false)}
      textAreaVal={textarea}
      handleTextArea={setTextarea}
      handlerForm={() => {
        dispatch({
          type: action[type],
          id,
          content: textarea,
          dispatch,
        });
        setContentEdit(false);
      }}
    />
  ) : (
    <Container>
      <Profile>
        <img src={image} />
      </Profile>
      <Content>
        <Title owner={isOwner}>
          <Arrow owner={isOwner} />
          <Author>
            <Bold>{username}</Bold>
            <Shared.Span>commented {time}</Shared.Span>
          </Author>
          {isOwner ? (
            <Controller>
              <Owner>Owner</Owner>
              <EditButton onClick={() => setContentEdit(true)}>Edit</EditButton>
            </Controller>
          ) : null}
        </Title>
        <Body>
          <Pre ref={preRef} dangerouslySetInnerHTML={{ __html: content }}></Pre>
        </Body>
      </Content>
    </Container>
  );
}

IssuePost.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  time: PropTypes.string,
  textAreaVal: PropTypes.string,
};

export default IssuePost;
