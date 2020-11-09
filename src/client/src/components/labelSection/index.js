import React, { useState, useEffect } from 'react';
import Http from '../../util/http-common';
import LabelMilestoneButton from '../LabelMilestoneButton';
import LabelList from './LabelList';
import Button from '../Button';
import {
  ButtonBox,
  Container,
  Header,
  ContentsContainer,
  ContentsListHeader,
} from './labelStyle';

const effecter = (setLabelList) => {
  useEffect(() => {
    fetch(`${Http}api/label`)
      .then((res) => res.json())
      .then((labels) => {
        setLabelList(labels);
      });
  }, []);
};

function LabelSection() {
  const [labelList, setLabelList] = useState([]);

  effecter(setLabelList);

  return (
    <Container>
      <Header>
        <LabelMilestoneButton page="label" left={true} />
        <ButtonBox>
          <Button>new Label</Button>
        </ButtonBox>
      </Header>
      {labelList.length ? (
        <ContentsContainer>
          <ContentsListHeader>{labelList.length} labels</ContentsListHeader>
          {labelList.map((label, index) => (
            <LabelList label={label} key={index}></LabelList>
          ))}
        </ContentsContainer>
      ) : null}
    </Container>
  );
}

export default LabelSection;
