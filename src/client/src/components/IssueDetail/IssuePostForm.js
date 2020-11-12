import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextArea from '../Textarea';
import Button from '../Button';
import IssueDetailContext from '../Context/IssueDetailContext';
import UserImage from '../../../public/images/user.png';
import ImageUpload from '../imageUpload/ImageUpload';
import handleFiles from '../../util/api/handleFile';

const Container = styled.div`
  display: flex;
`;

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
    top: 55%;
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

const InputDisPlayNone = styled.input`
  display: none;
`;

const DivContentStyled = styled.div`
  height: 465px;

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
    color: black;
  }
`;

const Profile = styled.div`
  margin-right: 2rem;
  & {
    img {
      width: 48px;
    }
  }
`;

function IssueForm({
  handlerForm,
  textAreaVal,
  handleTextArea,
  setContentEdit,
}) {
  const { state } = useContext(IssueDetailContext);
  const [stateButton, setStateButton] = useState(textAreaVal ? '' : 'disabled');
  const PATH = process.env.REACT_APP_IMGUR_PATH;
  const CLIENT = process.env.REACT_APP_CLIENT;
  const [imgUrl, setImgUrl] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleInput = () => (e) => {
    handleTextArea(e.target.value);
    if (e.target.value === '') {
      setStateButton('disabled');
    } else {
      setStateButton('');
    }
  };
  const handleFocus = (isFocus) => setFocus(isFocus);

  useEffect(() => {
    let temp = '';
    imgUrl.forEach((url) => {
      temp += `<img src="${url}" />\n`;
    });
    if (temp !== '') {
      let resultText = textAreaVal;
      if (textAreaVal !== '') resultText += '\n';
      handleTextArea(`${resultText}${temp}`);
      setStateButton('false');
    }
  }, [imgUrl]);

  return (
    <Container>
      <Profile>
        <img src={state.user.profile || UserImage} />
      </Profile>
      <DivStyled>
        <DivContentStyled>
          <InputDisPlayNone type="radio" checked readOnly />
          <label>Write</label>
          <DivDetailStyled>
            <TextArea
              height={300}
              value={textAreaVal}
              placeholder={'Leave a comment'}
              handleInput={handleInput()}
              handleFiles={handleFiles(PATH, CLIENT, setImgUrl)}
              handleFocus={handleFocus}
              imageUpload={true}
            />
            <ImageUpload
              focus={focus}
              handleFiles={handleFiles(PATH, CLIENT, setImgUrl)}
            ></ImageUpload>
            <DivFooterStyled>
              <SapnCancelStyled onClick={setContentEdit}>
                Cancel
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
    </Container>
  );
}

IssueForm.propTypes = {
  handlerForm: PropTypes.func,
  textAreaVal: PropTypes.string.isRequired,
  handleTextArea: PropTypes.func.isRequired,
  setContentEdit: PropTypes.func.isRequired,
};

export default IssueForm;
