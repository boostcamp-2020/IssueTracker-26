import React, { useEffect, useState, useContext } from 'react';
import theme from '../Theme';
import UserImage from '../../../public/images/user.png';
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
import ImageUpload from '../imageUpload/ImageUpload';
import handleFiles from '../../util/handleFile';
import tagGenerator from '../../util/tag-generator';

function TouchComment() {
  const { state: user } = useContext(UserContext);
  const { state, dispatch } = useContext(IssueDetailContext);
  const { issue } = state;
  const [textArea, setTextArea] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleFocus = (isFocus) => setFocus(isFocus);
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

  useEffect(
    () => tagGenerator(imgUrl, textArea, setTextArea, setButtonState, true),
    [imgUrl],
  );

  return (
    <InputContainer>
      <ProfileBox>
        <img src={user.profile || UserImage}></img>
      </ProfileBox>
      <InputBox>
        <InputHeader>
          <div>Write</div>
        </InputHeader>
        <InputBody>
          <Textarea
            value={textArea}
            handleFiles={handleFiles(setImgUrl)}
            handleFocus={handleFocus}
            handleInput={handleTextArea}
            imageUpload={true}
            height={150}
          />
          <ImageUpload
            focus={focus}
            handleFiles={handleFiles(setImgUrl)}
          ></ImageUpload>
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
                  state: issue.state ? 0 : 1,
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
