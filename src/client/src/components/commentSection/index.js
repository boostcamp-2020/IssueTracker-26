import React from 'react';
import styled from 'styled-components';
import TouchComment from './TouchComment';

const TestDiv = styled.div`
  width: 600px;
  margin: 60px;
`;
function Comment() {
  return (
    <TestDiv>
      <TouchComment></TouchComment>
    </TestDiv>
  );
}

export default Comment;
