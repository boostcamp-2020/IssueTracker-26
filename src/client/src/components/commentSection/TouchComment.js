import React, { useEffect, useState, useContext } from 'react';
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
import ImageUpload from '../imageUpload/ImageUpload';

function TouchComment() {
  const { state: user } = useContext(UserContext);
  const { state, dispatch } = useContext(IssueDetailContext);
  const { issue } = state;
  const [textArea, setTextArea] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const PATH = process.env.REACT_APP_IMGUR_PATH;
  const CLIENT = process.env.REACT_APP_CLIENT;
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
      let resultText = textArea;
      if (textArea !== '') resultText += '\n';
      setTextArea(`${resultText}${temp}`);
      setButtonState(true);
    };
  }, [imgUrl]);

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
            handleFiles={handleFiles}
            handleFocus={handleFocus}    
            handleInput={handleTextArea}
            height={150}
          />
          <ImageUpload focus={focus} handleFiles={handleFiles}></ImageUpload>
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
