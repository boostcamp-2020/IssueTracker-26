import React, { useState } from 'react';
import theme from '../Theme';
import testImg from '../../../public/images/test.svg';
import {
  InputContainer,
  ProfileBox,
  InputBox,
  InputHeader,
  InputBody,
  SubmitLayer,
  Textarea,
  Button,
} from './Style';

function TouchComment() {
  const [textArea, setTextArea] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleSubmit = () => {
    if (buttonState) {
      console.log('hi');
    }
  };
  const handleTextArea = ({ target }) => {
    setTextArea(target.value);
    if (target.value === '') {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  };

  return (
    <InputContainer>
      <ProfileBox>
        <img src={testImg}></img>
      </ProfileBox>
      <InputBox>
        <InputHeader>
          <div>Write</div>
        </InputHeader>
        <InputBody>
          <Textarea
            height="150px"
            bgColor={theme.Color.lightGrayBackground}
            borderColor={theme.Color.border}
            placeholder="Leave a comment"
            onChange={handleTextArea}
          ></Textarea>
          <SubmitLayer>
            <Button
              bgColor="white"
              fontColor="balck"
              borderColor={theme.Color.border}
              hoverColor="#eaebec"
              canSubmit={true}
            >
              Close issue
            </Button>
            <Button
              bgColor={theme.Color.button}
              fontColor="white"
              borderColor={theme.Color.border}
              hoverColor={theme.Color.buttonHover}
              onClick={handleSubmit}
              canSubmit={buttonState}
            >
              Comment
            </Button>
          </SubmitLayer>
        </InputBody>
      </InputBox>
    </InputContainer>
  );
}

export default TouchComment;
