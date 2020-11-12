import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 10vh;
  background: #2f363d;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  height: 100%;
  p {
    margin-top: 10px;
  }
`;

function Footer() {
  return (
    <HeaderDiv>
      <ContentDiv>
        <h3>© 2020 Issue Tracker26, Inc. All rights reserved</h3>
        <p>
          BoostCamp : J086 박주영⚔️, J147 이소정😈, J175 장우영🌌 , J202
          차효준🐶
        </p>
      </ContentDiv>
    </HeaderDiv>
  );
}

export default Footer;
