import React from 'react';
import styled from 'styled-components';

const ContentDiv = styled.div`
  display: flex;
  height: 50px;
  padding-top: 15px;
  padding-right: 15px;
  font-size: 0.8rem;
  background: ${(props) => props.theme.Color.grayBackground};
  text-align: center;
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
`;

function IssueListMenu() {
  return (
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
      <div>
        <span>Comment</span>
      </div>
    </ContentDiv>
  );
}

export default IssueListMenu;
