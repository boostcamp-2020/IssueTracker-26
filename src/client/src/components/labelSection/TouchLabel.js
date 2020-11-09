import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/InputComponent';
import Button from '../Button';
import Http from '../../util/http-common';
import {
  LabelSpan,
  WorkContainer,
  Layer,
  EmptyDiv,
  EditButton,
} from './labelStyle';

function TouchLabel(props) {
  const { title = 'Label preview', description, color, handler } = props;
  const [randColor, setRandColor] = useState(false);
  const [input, setInput] = useState({ name: '', description: '' });

  const handleInput = ({ target }) => {
    const { value, name } = target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${Http}api/label`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.name,
        description: input.description,
        color: randColor,
      }),
    })
      .then((res) => res.status)
      .then((status) => console.log(status));
  };
  const getRandomColor = () => {
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setRandColor(newColor);
  };

  if (!randColor) getRandomColor();

  return (
    <WorkContainer>
      <Layer>
        <LabelSpan color={color || randColor}>{title}</LabelSpan>
        <div></div>
      </Layer>
      <Layer>
        <div>
          Label name
          <Input
            name="name"
            value={input.name}
            placeholder="Label name"
            height="30px"
            width="80%"
            fontSize="14px"
            onChange={handleInput}
          />
        </div>
        <div>
          Description
          <Input
            name="description"
            value={input.description}
            placeholder="Description(optional)"
            height="30px"
            width="110%"
            fontSize="14px"
            onChange={handleInput}
          />
        </div>
        <div>
          <div>color</div>
          <EditButton onClick={getRandomColor}>change</EditButton>
          <EditButton width="80px">{randColor}</EditButton>
        </div>
        <div>
          <EmptyDiv>empty element for align</EmptyDiv>
          <EditButton onClick={handler}>Cancle</EditButton>
          <Button handler={handleSubmit}>Create label</Button>
        </div>
      </Layer>
    </WorkContainer>
  );
}

TouchLabel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  handler: PropTypes.func,
};

export default TouchLabel;
