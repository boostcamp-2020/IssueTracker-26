import React, { useState, useEffect } from 'react';
import Http from '../../util/http-common';
import LabelMilestoneButton from '../LabelMilestoneButton';
import LabelList from './LabelList';
import Button from '../Button';
import TouchLabel from './TouchLabel';
import {
  Container,
  Header,
  ContentsContainer,
  ContentsListHeader,
} from './labelStyle';

function LabelSection() {
  const [labelList, setLabelList] = useState([]);
  const [activeNew, setActiveNew] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleLabelList = (labels) => setLabelList(labels);
  const handleNewLabel = () => setActiveNew(!activeNew);
  const handleRerender = () => setRerender(!rerender);

  useEffect(() => {
    fetch(`${Http}api/label`)
      .then((res) => res.json())
      .then((labels) => {
        handleLabelList(labels);
      });
  }, [activeNew, rerender]);

  return (
    <Container>
      <Header>
        <div>
          <LabelMilestoneButton page="label" left={true} />
        </div>
        <div>
          <Button height={'32px'} width={'120px'} handler={handleNewLabel}>
            new Label
          </Button>
        </div>
      </Header>
      {activeNew && <TouchLabel handler={handleNewLabel}></TouchLabel>}
      {labelList.length ? (
        <ContentsContainer>
          <ContentsListHeader>{labelList.length} labels</ContentsListHeader>
          {labelList.map((label, index) => (
            <LabelList
              handleRender={handleRerender}
              label={label}
              key={index}
            />
          ))}
        </ContentsContainer>
      ) : null}
    </Container>
  );
}

export default LabelSection;
