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
  const handleCreate = (e) => {
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
      .then((status) => {
        if (status === 201) handler();
        else alert('fail');
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${Http}api/label/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.name,
        description: input.description,
        color: randColor,
      }),
    })
      .then((res) => res.status)
      .then((status) => {
        if (status === 200) handler();
        else alert('fail');
      });
  };

  const handleRandom = () => setRandColor(getRandomColor());

  return (
    <WorkContainer isEdit={isEdit}>
      <Layer>
        <LabelSpan color={randColor}>
          {title === '' ? 'Label preview' : title}
        </LabelSpan>
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
          <EditButton onClick={handleRandom}>change</EditButton>
          <EditButton width="80px">{randColor}</EditButton>
        </div>
        <div>
          <EmptyDiv>empty element for align</EmptyDiv>
          <EditButton onClick={handler}>Cancle</EditButton>
          <Button width="100px" handler={isEdit ? handleEdit : handleCreate}>
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
