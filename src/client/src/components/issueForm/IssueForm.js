import React, { useState } from 'react';
import styled from 'styled-components';
import TextArea from '../Textarea';

const DivStyled = styled.div`
  border: #e1e4e8 1px solid;
  flex-grow: 1;
  height: 100%;
  max-width: 848px;
  margin-left: auto;

  position: relative;
  border: 1px solid #e1e4e8;
  border-radius: 8px;

  &:after,
  &:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-right-color: #ffffff;
    border-width: 10px;
    margin-top: -228px;
  }
  &:before {
    border-color: rgba(245, 2, 2, 0);
    border-right-color: #e1e4e8;
    border-width: 12px;
    margin-top: -230px;
  }
`;

const DivSubStyled = styled.div`
  padding: 10px;
`;

const DivContentStyled = styled.div`
  height: 436px;
  input {
    display: none;
  }

  label {
    display: inline-block;
    margin: 0 0 -1px;
    padding: 10px 25px;
    margin-top: 10px;
    margin-left: 12px;
    font-weight: 600;
    text-align: center;
    border: 1px solid transparent;
  }

  input:checked + label {
    color: #555;
    border: 1px solid #e1e4e8;
    border-top: 1px solid #e1e4e8;
    border-bottom: 1px solid #ffffff;
    border-radius: 7px 7px 0 0;
  }
  input:checked ~ #content1 {
    display: block;
  }
`;

const DivDetailStyled = styled.div`
  display: none;
  padding: 10px;
  border-top: 1px solid #e1e4e8;
  display: flex;
`;

const InputTitleStyled = styled.input`
  border: 1px solid #e1e4e8;
  border-radius: 7px;
  height: 32px;
  width: 100%;
  padding-left: 10px;
  color: #e1e4e8;
  font-size: 1rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #79b8ff;
  }
`;
function IssueForm() {
  const [textAreaVal, setTextAreaVal] = useState('');

  const handleTextArea = (e) => {
    setTextAreaVal(e.target.value);
  };

  return (
    <DivStyled>
      <DivSubStyled>
        <InputTitleStyled placeholder="Title" />
      </DivSubStyled>
      <DivContentStyled>
        <input type="radio" checked readOnly />
        <label>Write</label>
        <DivDetailStyled>
          <TextArea
            height={300}
            value={textAreaVal}
            placeholder={'Leave a comment'}
            handleInput={handleTextArea}
          />
          <div></div>
        </DivDetailStyled>
      </DivContentStyled>
    </DivStyled>
  );
}

export default IssueForm;
