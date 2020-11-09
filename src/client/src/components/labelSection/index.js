import React, { useState, useEffect } from 'react';
import Http from '../../util/http-common';
import LabelMilestoneButton from '../LabelMilestoneButton';
import LabelList from './LabelList';
import Button from '../Button';
import TouchLabel from './TouchLabel';
import {
  ButtonBox,
  Container,
  Header,
  ContentsContainer,
  ContentsListHeader,
} from './labelStyle';

function LabelSection() {
  const [labelList, setLabelList] = useState([]);
  const [activeNew, setActiveNew] = useState(false);

  const handleNewLabel = () => setActiveNew(!activeNew);

  useEffect(() => {
    fetch(`${Http}api/label`)
      .then((res) => res.json())
      .then((labels) => {
        setLabelList(labels);
      });
  }, [activeNew]);

  return (
    <Container>
      <Header>
        <LabelMilestoneButton page="label" left={true} />
        <ButtonBox>
          <Button handler={handleNewLabel}>new Label</Button>
        </ButtonBox>
      </Header>
      {activeNew && <TouchLabel handler={handleNewLabel}></TouchLabel>}
      {labelList.length ? (
        <ContentsContainer>
          <ContentsListHeader>{labelList.length} labels</ContentsListHeader>
          {labelList.map((label, index) => (
            <LabelList label={label} key={index} />
          ))}
        </ContentsContainer>
      ) : null}
    </Container>
  );
}

export default LabelSection;
