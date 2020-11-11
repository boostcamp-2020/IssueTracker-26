import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from '../Textarea';
import ImageUpload from './ImageUpload';

const Div = styled.div`
  margin: 10px;
  width: 500px;
`;

function Index() {
  const PATH = process.env.REACT_APP_IMGUR_PATH;
  const CLIENT = process.env.REACT_APP_CLIENT;
  const [imgUrl, setImgUrl] = useState([]);
  const [textarea, setTextarea] = useState('');
  const [focus, setFocus] = useState(false);

  const handleTextarea = (e) => setTextarea(e.target.value);
  const handleFocus = (isFocus) => setFocus(isFocus);

  const handleFiles = (e) => {
    const newFiles = e.target.files; // object
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
      temp += `\n<img src="${url}" />`;
    });
    setTextarea(`${textarea}${temp}`);
  }, [imgUrl]);

  return (
    <Div>
      <Textarea
        value={textarea}
        handleFocus={handleFocus}
        handleInput={handleTextarea}
      ></Textarea>
      <ImageUpload focus={focus} handleFiles={handleFiles}></ImageUpload>
    </Div>
  );
}

export default Index;
