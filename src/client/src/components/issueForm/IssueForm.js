import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextArea from '../Textarea';
import Button from '../Button';
import ImageUpload from '../imageUpload/ImageUpload';

const DivStyled = styled.div`
  border: #e1e4e8 1px solid;
  flex-grow: 1;
  height: 100%;
  max-width: 830px;
  margin-right: auto;

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

const InputDisPlayNone = styled.input`
  display: none;
`;

const DivContentStyled = styled.div`
  height: 436px;

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
  flex-direction: column;
`;

const InputTitleStyled = styled.input`
  border: 1px solid #e1e4e8;
  border-radius: 7px;
  height: 32px;
  width: 100%;
  padding-left: 10px;
  color: black;
  font-size: 1rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #79b8ff;
  }
`;

const DivFooterStyled = styled.div`
  display: flex;
  margin-top: 12px;
  line-height: 40px;
`;

const SapnCancelStyled = styled.span`
  vertical-align: middle;
  margin-right: auto;
  font-weight: bold;
  color: #586069;
  font-size: 1.2rem;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
  &:link {
    color: red;
    text-decoration: none;
  }
  &:visited {
    color: black;
    text-decoration: none;
  }
  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;

function IssueForm({
  handlerForm,
  textAreaVal,
  setTextAreaVal,
  inputVal,
  setInputVal,
}) {
  const [stateButton, setStateButton] = useState('disabled');
  const PATH = process.env.REACT_APP_IMGUR_PATH;
  const CLIENT = process.env.REACT_APP_CLIENT;
  const [imgUrl, setImgUrl] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleTextArea = (e) => {
    setTextAreaVal(e.target.value);
  };

  const handleInput = (e) => {
    setInputVal(e.target.value);
    if (e.target.value === '') {
      setStateButton('disabled');
    } else {
      setStateButton('');
    }
  };

  const handleFocus = (isFocus) => setFocus(isFocus);

  const handleFiles = (e) => {
    e.preventDefault();
    const newFiles = e.dataTransfer?.files || e.target.files; // object
    const newFileList = [];
    for (let i = 0; i < newFiles.length; i += 1) {
      newFileList.push(newFiles[i]);
    }
    Promise.all(
      newFileList.map((newFile) => {
        if (newFile.size < 500000) {
          return fetch(PATH, {
            method: 'POST',
            headers: {
              Authorization: `Client-ID ${CLIENT}`,
              Accept: 'application/json',
            },
            body: newFile,
          })
            .then((res) => res.json())
            .then((res) => {
              return res.data.link;
            });
        }
        return undefined;
      }),
    ).then((urlList) => setImgUrl([...urlList]));
  };

  useEffect(() => {
    let temp = '';
    imgUrl.forEach((url) => {
      temp += `<img src="${url}" />\n`;
    });
    if (temp !== '') {
      let resultText = textAreaVal;
      if (textAreaVal !== '') resultText += '\n';
      setTextAreaVal(`${resultText}${temp}`);
      setStateButton('false');
    }
  }, [imgUrl]);

  return (
    <DivStyled>
      <DivSubStyled>
        <InputTitleStyled
          onChange={handleInput}
          value={inputVal}
          placeholder="Title"
        />
      </DivSubStyled>
      <DivContentStyled>
        <InputDisPlayNone type="radio" checked readOnly />
        <label>Write</label>
        <DivDetailStyled>
          <TextArea
            height={300}
            value={textAreaVal}
            placeholder={'Leave a comment'}
            handleInput={handleTextArea}
            handleFiles={handleFiles}
            handleFocus={handleFocus}
            imageUpload={true}
          />
          <ImageUpload focus={focus} handleFiles={handleFiles}></ImageUpload>
          <DivFooterStyled>
            <SapnCancelStyled>
              <Link to="/">Cancel</Link>
            </SapnCancelStyled>
            <Button
              width={'160px'}
              height={'40px'}
              fontSize="1rem"
              handler={handlerForm}
              disabled={stateButton}
            >
              Submit new issue
            </Button>
          </DivFooterStyled>
        </DivDetailStyled>
      </DivContentStyled>
    </DivStyled>
  );
}

IssueForm.propTypes = {
  handlerForm: PropTypes.func,
  textAreaVal: PropTypes.string,
  setTextAreaVal: PropTypes.func,
  inputVal: PropTypes.string,
  setInputVal: PropTypes.func,
};

export default IssueForm;
