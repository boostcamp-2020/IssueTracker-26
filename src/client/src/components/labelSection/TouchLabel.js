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
  Div,
} from './labelStyle';

function TouchLabel(props) {
  const { id, title = '', description = '', color, handler, isEdit } = props;
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [randColor, setRandColor] = isEdit
    ? useState(color)
    : useState(getRandomColor());
  const [input, setInput] = useState({ name: title, description });

  const handleInput = ({ target }) => {
    const { value, name } = target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let path = `${Http}api/label`;
    let method = 'POST';

    if (isEdit) {
      path = `${Http}api/label/${id}`;
      method = 'PUT';
    }

    fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.name,
        description: input.description,
        color: randColor,
      }),
    })
      .then((res) => res.status)
      .then((status) => {
        if (status === 201 || status === 200) handler();
        else alert('fail');
      });
  };

  const handleRandom = () => setRandColor(getRandomColor());

  return (
    <WorkContainer isEdit={isEdit}>
      <Layer>
        <LabelSpan color={randColor}>
          {input.name === '' ? 'Label preview' : input.name}
        </LabelSpan>
        <div></div>
      </Layer>
      <Layer>
        <Div width="140px">
          Label name
          <Input
            name="name"
            value={input.name}
            placeholder="Label name"
            height="30px"
            width="100%"
            fontSize="14px"
            onChange={handleInput}
          />
        </Div>
        <Div width="200px">
          Description
          <Input
            name="description"
            value={input.description}
            placeholder="Description(optional)"
            height="30px"
            width="100%"
            fontSize="14px"
            onChange={handleInput}
          />
        </Div>
        <div>
          <div>color</div>
          <EditButton onClick={handleRandom}>change</EditButton>
          <EditButton width="80px">{randColor}</EditButton>
        </div>
        <div>
          <EmptyDiv>empty element for align</EmptyDiv>
          <EditButton onClick={handler}>Cancle</EditButton>
          <Button width="100px" handler={handleSubmit}>
            {isEdit ? 'Save changes' : 'Create label'}
          </Button>
        </div>
      </Layer>
    </WorkContainer>
  );
}

TouchLabel.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  handler: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default TouchLabel;
