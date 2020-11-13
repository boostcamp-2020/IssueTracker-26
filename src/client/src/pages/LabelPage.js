import React from 'react';
import styled from 'styled-components';
import LabelSection from '../components/labelSection';

const DivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LabelPage() {
  return (
    <DivStyled>
      <LabelSection />
    </DivStyled>
  );
}

export default LabelPage;
