import React, { useState, useContext } from 'react';
import theme from '../Theme';
import testImg from '../../../public/images/test.svg';
import {
  InputContainer,
  ProfileBox,
  InputBox,
  InputHeader,
  InputBody,
  SubmitLayer,
  Button,
} from './Style';
import Textarea from '../Textarea';
import IssueDetailContext from '../Context/IssueDetailContext';
import UserContext from '../Context/UserContext';
import IssueDetailAction from '../IssueDetail/action';

function TouchComment() {
  const { state: user } = useContext(UserContext);
  const { state, dispatch } = useContext(IssueDetailContext);
  const { issue } = state;
  const [textArea, setTextArea] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleSubmit = () => {
    dispatch({
      type: IssueDetailAction.CREATE_COMMENT,
      user,
      content: textArea,
      dispatch,
    });
    setTextArea('');
    setButtonState(false);
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
            value={textArea}
            handleInput={handleTextArea}
            height={150}
          />
          <SubmitLayer>
            <Button
              bgColor="white"
              fontColor="balck"
              borderColor={theme.Color.border}
              hoverColor="#eaebec"
              canSubmit={true}
              onClick={() =>
                dispatch({
                  type: IssueDetailAction.CHANGE_ISSUE_STATE,
                  dispatch,
                  state: issue.state ? 'Close' : 'Open',
                })
              }
            >
              {issue.state ? 'Close' : 'Open'} issue
            </Button>
            <Button
              bgColor={theme.Color.button}
              fontColor="white"
              borderColor={theme.Color.border}
              hoverColor={theme.Color.buttonHover}
              onClick={buttonState ? handleSubmit : null}
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
